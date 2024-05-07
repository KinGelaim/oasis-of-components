import { CalendarDate } from "../interfaces/calendar-date.interface";
import { CalendarDates } from "../interfaces/calendar-dates.interface";
import { CalendarType } from "../shared/calendar-type.enum";
import { CalendarSettings } from '../shared/calendar-settings.model';
import { DateHelper } from "../helpers/date-helper.class";
import { Weekday, WeekdayDate } from "../shared/weekday.enum";

/**
 * Сервис для генерации таблиц календаря (внешний вид)
 */
export class CalendarTableGeneratorService {
  /** Количество дней в одной строке для таблицы дней в модальном окне календаря */
  private readonly DAYS_AMOUNT: number = 7;

  /** Количество месяцев в одной строке для таблицы месяцев в модальном окне календаря */
  private readonly MONTHS_AMOUNT: number = 3;

  /** Количество лет в одной строке для таблицы годов в модальном окне календаря */
  private readonly YEARS_AMOUNT: number = 3;

  /** Индекс первого месяца в библиотеке Date */
  private readonly INDEX_FIRST_MONTH: number = 0;

  /** Индекс первого месяца в библиотеке Date */
  private readonly INDEX_LAST_MONTH: number = 11;

  /** Граница отображения годов в таблице модального окна по годам */
  private readonly BORDER_YEAR: number = 4;

  /** Отображение таблицы дней */
  public days: CalendarDates[] = [];

  /** Отображение таблицы месяцев */
  public months: CalendarDates[] = [];

  /** Отображение таблицы годов */
  public years: CalendarDates[] = [];

  /**
   * Конструктор для создания сервиса
   * @param calendarSettings настройки календаря
   */
  public constructor(private calendarSettings: CalendarSettings) { }

  /**
   * Генерирует дни календаря
   * @param viewDate дата вокруг которой строится таблица дней
   * @param selectDate выбранная дата в календаре (при одиночном выборе)
   * @param firstDate первая выбранная дата в календаре (при множественном выборе)
   * @param secondDate вторая выбранная дата в календаре (при множественном выборе)
   */
  public generateDays(viewDate: Date, selectDate: Date | null, firstDate: Date | null, secondDate: Date | null): void {    
    const firstDay = DateHelper.GetFirstDayOfMonth(viewDate);
    const lastDay = DateHelper.GetLastDayOfMonth(viewDate);

    const startDay = DateHelper.GetFirstDayOfWeek(firstDay);
    const endDay = DateHelper.GetLastDayOfWeek(lastDay, 0);

    const date = new Date(new Date(startDay).setDate(startDay.getDate() - 1));

    // Если выбран первый день при множественном выборе и существует отключённые дни, то выбор осуществляется только внутри периода границы которого отключённые дни
    // Т.е. нельзя, чтобы среди выбранного периода были отключённые дни
    // !На данный момент работает только для отключённых дней
    let firstDisabledDay: Date | null = null;
    let lastDisabledDay: Date | null = null;
    if (firstDate != null && this.calendarSettings.calendarDisabledDatesSettings != null) {
      this.calendarSettings.calendarDisabledDatesSettings.forEach(item => {
        item.days.forEach(dateValue => {
          if ((firstDisabledDay == null || firstDisabledDay <= dateValue) && dateValue <= firstDate) {
            firstDisabledDay = dateValue;
          }

          if ((lastDisabledDay == null || lastDisabledDay >= dateValue) && dateValue >= firstDate) {
            lastDisabledDay = dateValue;
          }
        });
      });
    }

    const days: CalendarDates[] = [];
    while (new Date(new Date(date).setDate(date.getDate() + 1)) < endDay) {
      days.push({
        dates: Array(this.DAYS_AMOUNT)
          .fill(0)
          .map(() => {
            const value = new Date(date.setDate(date.getDate() + 1));

            // Проверка на попадание в месяц для дней
            let visibleDisabled = viewDate.getMonth() != value.getMonth();
            let disabled = false;

            // Проверка на попадание в заданные диапазоны
            if (this.calendarSettings.bottomDate != null && !disabled) {
              disabled = this.calendarSettings.bottomDate > new Date(new Date(value).setSeconds(value.getSeconds() + 1));
            }

            if (this.calendarSettings.topDate != null && !disabled) {
              disabled = this.calendarSettings.topDate < new Date(new Date(value).setSeconds(value.getSeconds() - 1));
            }

            // Установка цвета
            let colorTextDay = this.calendarSettings.defaultFontColor;
            let backgroundColorTextDay = this.calendarSettings.defaultBackgroundColorItem;
            let selectedColorTextDay = this.calendarSettings.defaultSelectedFontColor;
            let selectedBackgroundColorTextDay = this.calendarSettings.defaultSelectedBackgroundColorItem;

            // Проверяем на отключенные дни, при разных режимах работы календаря и настраиваем цвет текста в календаре
            [disabled, colorTextDay, backgroundColorTextDay, selectedColorTextDay, selectedBackgroundColorTextDay] = this.checkDisabledAndColorText(disabled, visibleDisabled, value, colorTextDay, backgroundColorTextDay, selectedColorTextDay, selectedBackgroundColorTextDay);

            // Отключаем дни для множественного выбора при отключённых промежуточных днях
            if (firstDate != null && secondDate == null && !disabled) {
                disabled = firstDisabledDay != null && value <= firstDisabledDay
                            || lastDisabledDay != null && lastDisabledDay <= value;
            }

            // Проверка на выбранный день и попадание в промежуток при выборе промежутка дат
            let [selected, hoveredMulti] = this.checkSelectedHoveredMultiDay(value, selectDate, firstDate, secondDate);

            return {
              value,
              isDisabled: disabled,
              colorTextDay,
              backgroundColorTextDay,
              selectedColorTextDay,
              selectedBackgroundColorTextDay,
              isSelected: selected,
              isHoveredMulti: hoveredMulti
            } as CalendarDate;
          })
      });
    }

    this.days = days;
  }

  /**
   * Проверка на выбранный день и попадание в промежуток дат при выборе диапазона
   */
  private checkSelectedHoveredMultiDay(value: Date, selectDate: Date | null, firstDate: Date | null, secondDate: Date | null): [boolean, boolean] {
    let selected = false;
    let hoveredMulti = false;

    if (this.calendarSettings.multiSelectable) {
      if (firstDate != null && DateHelper.comparingDatesWithoutTime(firstDate, value) || secondDate != null && DateHelper.comparingDatesWithoutTime(secondDate, value)) {
        selected = true;
      }

      if (firstDate != null && secondDate != null) {
        if (firstDate <= value && value <= secondDate) {
          hoveredMulti = true;
        }
      }
    } else {
      if (selectDate != null) {
        selected = DateHelper.comparingDatesWithoutTime(selectDate, value);
      }
    }

    return [selected, hoveredMulti];
  }

  /**
   * Проверка на отключение дней, если выбран режим и смена цвета
   * @param disabled является ли день уже отключенным
   * @param visibleDisabled является ли день отключенным по причине выхода за диапазон месяца
   * @param value значение даты
   * @param colorTextDay цвет текста дня
   * @param backgroundColorTextDay фон текста дня
   * @param selectedColorTextDay цвет текста выбранного дня
   * @param selectedBackgroundColorTextDay фон текста выбранного дня
   * @returns возвращает кортеж из (флаг отключен ли день, цвет текста, фон текста, цвет выбранного текста, фон выбранного текста)
   */
  private checkDisabledAndColorText(
    disabled: boolean,
    visibleDisabled: boolean,
    value: Date,
    colorTextDay: string,
    backgroundColorTextDay: string,
    selectedColorTextDay: string,
    selectedBackgroundColorTextDay: string
  ): [boolean, string, string, string, string] {
    if (!disabled) {
      // Проверка на попадание по типу графика (пятидневка, выбранные дни и т.д.)
      switch (this.calendarSettings.calendarType) {
        // Исключенные дни недели
        case CalendarType.ExcludeWeekDays:
          for (let enumItem in Weekday) {
            let enumValue = Number(enumItem);
            if (!isNaN(enumValue) && (this.calendarSettings.excludeWeekDays & enumValue) === enumValue && !disabled) {
              disabled = value.getDay() == WeekdayDate.get(enumValue);
            }
          }
          break;

        // Выбранные дни
        case CalendarType.SelectedDays:
          if (this.calendarSettings.calendarDatesSettings == null) {
            disabled = true;
            break;
          }

          let currentDisable = true;

          // Ищем текущую дату в разрешенных
          this.calendarSettings.calendarDatesSettings.forEach(item => {
            item.days.forEach(dateValue => {
              if (DateHelper.comparingDatesWithoutTime(value, dateValue)) {
                // Задаём цвета
                if (item.color.length) {
                  colorTextDay = item.color;
                }
                if (item.selectedColor.length) {
                  selectedColorTextDay = item.selectedColor;
                }
                if (item.selectedBackgroundColor.length) {
                  selectedBackgroundColorTextDay = item.selectedBackgroundColor;
                }
                currentDisable = false;
              }
            });
          });

          disabled = currentDisable;
          break;

        // График работы
        case CalendarType.WorkSchedule:
          // Если пропущены настройки
          if (this.calendarSettings.calendarWorkScheduleSettings == null) {
            disabled = true;
            break;
          }

          // Если дата раньше начальной
          let currentTime = value.getTime();
          let startTime = this.calendarSettings.calendarWorkScheduleSettings.startDateWorkSchedule.getTime();
          if (currentTime < startTime) {
            disabled = true;
            break;
          }

          // Если дата выпадает на выходные
          let diff = Math.abs(currentTime - startTime);
          let diffDays = Math.ceil(diff / DateHelper.MILLISECONDS_PER_DAY);

          if (diffDays % this.calendarSettings.calendarWorkScheduleSettings.workingCycleDays != 0) {
            disabled = true;
          }

          break;

        // Обычный календарь
        case CalendarType.None:
          // Цветные дни
          if (this.calendarSettings.coloredDays == null) {
            break;
          }

          this.calendarSettings.coloredDays.forEach(item => {
            item.days.forEach(dateValue => {
              if (DateHelper.comparingDatesWithoutTime(value, dateValue)) {
                // Задаём цвета
                if (item.color.length) {
                  colorTextDay = item.color;
                }
                if (item.selectedColor.length) {
                  selectedColorTextDay = item.selectedColor;
                }
                if (item.selectedBackgroundColor.length) {
                  selectedBackgroundColorTextDay = item.selectedBackgroundColor;
                }
              }
            });
          });
          break;
        default:
          break;
      }
    }

    if (visibleDisabled || disabled) {
      colorTextDay = this.calendarSettings.defaultDisabledFontColor;
    }

    // Проверяем на отключенные дни
    if (this.calendarSettings.calendarDisabledDatesSettings != null) {
      this.calendarSettings.calendarDisabledDatesSettings.forEach(item => {
        item.days.forEach(dateValue => {
          if (DateHelper.comparingDatesWithoutTime(value, dateValue)) {
            disabled = true;
            colorTextDay = this.calendarSettings.defaultDisabledFontColor;

            if (item.color.length) {
              colorTextDay = item.color;
            }

            if (item.backgroundColor.length) {
              backgroundColorTextDay = item.backgroundColor;
            }
          }
        });
      });
    }

    return [disabled, colorTextDay, backgroundColorTextDay, selectedColorTextDay, selectedBackgroundColorTextDay];
  }

  /**
   * Генерирует месяцы календаря
   * @param viewDate дата вокруг которой нужно настроить отображение
   */
  public generateMonths(viewDate: Date): void {
    const refNow = DateHelper.GetFirstDayOfMonth(viewDate);
    const startDay = new Date(new Date(refNow).setMonth(this.INDEX_FIRST_MONTH));
    const endDay = new Date(new Date(refNow).setMonth(this.INDEX_LAST_MONTH));

    const date = new Date(new Date(startDay).setMonth(startDay.getMonth() - 1));

    const months: CalendarDates[] = [];
    while (date < endDay) {
      months.push({
        dates: Array(this.MONTHS_AMOUNT)
          .fill(0)
          .map(() => {
            const value = new Date(date.setMonth(date.getMonth() + 1));

            let disabled = false;
            if (this.calendarSettings.bottomDate != null) {
              disabled = DateHelper.GetFirstDayOfMonth(this.calendarSettings.bottomDate) > value;
            }

            if (this.calendarSettings.topDate != null && !disabled) {
              disabled = this.calendarSettings.topDate < value;
            }

            const selected = viewDate.getMonth() == value.getMonth();
            return {
              value, isDisabled: disabled, isSelected: selected
            } as CalendarDate;
          })
      });
    }

    this.months = months;
  }

  /**
   * Генерирует годы календаря
   * Начальные и конечные года зависят от текущего в диапазоне 9 лет
   * @param viewDate дата вокруг которой нужно настроить отображение
   */
  public generateYears(viewDate: Date): void {
    const refNow = DateHelper.GetFirstDayOfMonth(viewDate);
    const startDay = new Date(new Date(refNow).setFullYear(refNow.getFullYear() - this.BORDER_YEAR));
    const endDay = new Date(new Date(refNow).setFullYear(refNow.getFullYear() + this.BORDER_YEAR));

    const date = new Date(new Date(startDay).setFullYear(startDay.getFullYear() - 1));

    const years: CalendarDates[] = [];
    while (date < endDay) {
      years.push({
        dates: Array(this.YEARS_AMOUNT)
          .fill(0)
          .map(() => {
            const value = new Date(date.setFullYear(date.getFullYear() + 1));

            let disabled = false;
            if (this.calendarSettings.bottomDate != null) {
              disabled = this.calendarSettings.bottomDate.getFullYear() > value.getFullYear();
            }

            if (this.calendarSettings.topDate != null && !disabled) {
              disabled = this.calendarSettings.topDate.getFullYear() < value.getFullYear();
            }

            const selected = viewDate.getFullYear() == value.getFullYear();
            return {
              value, isDisabled: disabled, isSelected: selected
            } as CalendarDate;
          })
      });
    }

    this.years = years;
  }

  /**
   * Извлекает конкретную дату из таблицы дней для модального окна календаря
   * @param searchValue искомая дата
   */
  public getDayFromArray(searchValue: Date): CalendarDate | null {
    return this.getValueFromArray(this.days, searchValue);
  }

  /**
   * Извлекает конкретную дату из таблицы месяцев для модального окна календаря
   * @param searchValue искомая дата
   */
  public getMonthFromArray(searchValue: Date): CalendarDate | null {
    return this.getValueFromArray(this.months, searchValue);
  }

  /**
   * Извлекает конкретную дату из таблицы годов для модального окна календаря
   * @param searchValue искомая дата
   */
  public getYearFromArray(searchValue: Date): CalendarDate | null {
    return this.getValueFromArray(this.years, searchValue);
  }

  /**
   * Извлекает конкретную дату из таблицы для модального окна календаря
   * @param calendarDatesList таблица для календаря
   * @param searchValue искомая дата
   */
  private getValueFromArray(calendarDatesList: CalendarDates[], searchValue: Date): CalendarDate | null {
    let findItem: CalendarDate | null = null;

    calendarDatesList.forEach(item => {
      item.dates.forEach(element => {
        if (DateHelper.comparingDatesWithoutTime(element.value, searchValue)) {
          findItem = element;
        }
      });
    });

    return findItem;
  }

  /**
   * Настраивает стиль у дней в календаре с множественным выбором, когда выбрана только первая ячейка и происходит перемещение мыши
   * @param selectedFirstDate выбранная дата
   * @param hoverElement дата на которой сейчас находится мышь
   */
  public hoverDatesMulti(selectedFirstDate: Date, hoverElement: Date): void {
    this.days.map(calendarDates => {
      calendarDates.dates.map(calendarDate => {
        if (!calendarDate.isDisabled || this.calendarSettings.calendarType != CalendarType.None) {
          calendarDate.isHoveredMulti = this.calendarSettings.reversible
            ? selectedFirstDate <= calendarDate.value && calendarDate.value <= hoverElement || hoverElement <= calendarDate.value && calendarDate.value <= selectedFirstDate
            : selectedFirstDate <= calendarDate.value && calendarDate.value <= hoverElement && selectedFirstDate != null && hoverElement >= selectedFirstDate;
        }
      });
    });
  }
}