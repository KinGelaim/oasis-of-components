import { CalendarSettings } from "../shared/calendar-settings.model";
import { DateHelper } from "../helpers/date-helper.class";

/**
 * Сервис для работы календарём
 */
export class CalendarService {
  /** Самая нижняя возможная граница выбора даты */
  private readonly LOWEST_DATE_VALUE: string = '0001-01-01';

  /** Самая верхняя возможная граница выбора даты */
  private readonly HIGHEST_DATE_VALUE: string = '3999-12-31';

  /** Дата вокруг которой строится календарь (нужна для отображения в UI) */
  public viewDate: Date | null = null;

  /** Выбранная дата в календаре (одиночный календарь) */
  public selectedDate: Date | null = null;

  /** Выбранная первая дата (множественный выбор) */
  public selectedFirstDate: Date | null = null;

  /** Выбранная вторая дата (множественный выбор) */
  public selectedSecondDate: Date | null = null;

  /** Нижний и верхний предел дат */
  public limitOfDates: [Date, Date] = [this.calendarSettings.baseDate, this.calendarSettings.baseDate];

  /**
   * Конструктор сервиса
   * @param calendarSettings настройки для календаря
   */
  public constructor(private calendarSettings: CalendarSettings) {
    this.viewDate = DateHelper.CopyDateWithoutTime(calendarSettings.beginViewDate);

    // Если двойной календарь
    if (this.calendarSettings.multiSelectable) {
      if (calendarSettings.beginDates[0] != null) {
        this.selectedFirstDate = DateHelper.CopyDateWithoutTime(calendarSettings.beginDates[0]);
      }

      if (calendarSettings.beginDates[1] != null) {
        this.selectedSecondDate = DateHelper.CopyDateWithoutTime(calendarSettings.beginDates[1]);
      }

      return;
    }

    // Если одиночный календарь
    if (calendarSettings.beginDate != null) {
      this.selectedDate = DateHelper.CopyDateWithoutTime(calendarSettings.beginDate);
    }
  }

  /**
   * Смена выбранных дат
   * @param day новая дата
   */
  public changeDates(day: Date): void {
    // Если одиночный календарь
    if (!this.calendarSettings.multiSelectable) {
      this.selectedDate = DateHelper.CopyDateWithoutTime(day);
      return;
    }

    // Если множественным выбор включён
    if (this.calendarSettings.multiSelectable) {
      // Если делается первый выбор
      if (this.selectedFirstDate == null || this.selectedSecondDate != null) {
        this.selectedFirstDate = DateHelper.CopyDateWithoutTime(day);
        this.selectedSecondDate = null;
      } else {
        // Выбираем вторую дату
        if (this.selectedSecondDate == null) {
          // Если можно выбирать в обратную сторону
          if (this.calendarSettings.reversible) {
            this.selectedSecondDate = DateHelper.CopyDateWithoutTime(day);
          } else {
            // Если нельзя выбирать в обратную сторону, то нужно проверить новую дату
            // Если она раньше уже выбранной, то заменяем
            if (day < this.selectedFirstDate) {
              this.selectedFirstDate = DateHelper.CopyDateWithoutTime(day);
            } else {
              this.selectedSecondDate = DateHelper.CopyDateWithoutTime(day);
            }
          }
        }
      }

      // Сортируем даты (чтобы всегда были по возрастанию)
      if (this.selectedFirstDate != null
        && this.selectedSecondDate != null
        && this.selectedSecondDate < this.selectedFirstDate) {
        let tmpDate = DateHelper.CopyDateWithoutTime(this.selectedFirstDate);
        this.selectedFirstDate = DateHelper.CopyDateWithoutTime(this.selectedSecondDate);
        this.selectedSecondDate = DateHelper.CopyDateWithoutTime(tmpDate);
      }
    }
  }

  /**
   * Метод смены месяцев с шагом
   * @param step шаг для смены месяца
   */
  public switchMonths(step: number): void {
    if (this.viewDate == null) {
      return;
    }

    const increasedMonth: Date = new Date(new Date(this.viewDate).setMonth(this.viewDate.getMonth() + step));

    this.changeCalendarTimeInterval(increasedMonth);
  }

  /**
   * Метод смены года с шагом
   * @param step шаг для смены года
   */
  public switchYears(step: number): void {
    if (this.viewDate == null) {
      return;
    }

    const increasedYear: Date = new Date(new Date(this.viewDate).setFullYear(this.viewDate.getFullYear() + step));

    this.changeCalendarTimeInterval(increasedYear);
  }

  /**
   * Устанавливает значение месяца для отображаемой даты
   * @param selectedMonth новая дата
   */
  public changeMonth(selectedMonth: Date): void {
    if (this.viewDate == null) {
      return;
    }

    this.viewDate = new Date(new Date(this.viewDate).setMonth(selectedMonth.getMonth()));
  }

  /**
   * Устанавливает значение года для отображаемой даты
   * @param selectedYear новая дата
   */
  public changeYear(selectedYear: Date): void {
    if (this.viewDate == null) {
      return;
    }

    this.viewDate = new Date(new Date(this.viewDate).setFullYear(selectedYear.getFullYear()));
  }

  /**
   * Задает нижний и верхний предел дат
   */
  public setLimitOfDates(): void {
    let lowestDate = new Date(this.LOWEST_DATE_VALUE);
    let highestDate = new Date(this.HIGHEST_DATE_VALUE);

    if (this.calendarSettings.bottomDate != null) {
      lowestDate = new Date(this.calendarSettings.bottomDate);
    }

    if (this.calendarSettings.topDate != null) {
      highestDate = new Date(this.calendarSettings.topDate);
    }

    this.limitOfDates = [lowestDate, highestDate];
  }

  /**
   * Устанавливает дату в календарь
   * Происходит при нажатии стрелочек (переключение месяцев и годов)
   * @param newDate новая дата
   */
  private changeCalendarTimeInterval(newDate: Date): void {
    let copyNewDate = DateHelper.CopyDateWithoutTime(newDate);

    // Для стандартных календарей
    let checkBottomDate = this.calendarSettings.bottomDate != null;
    let checkTopDate = this.calendarSettings.topDate != null;
    let bottomDateLessOrEqualDate = this.calendarSettings.bottomDate! <= copyNewDate;
    let topDateGreaterOrEqualDate = this.calendarSettings.topDate! >= copyNewDate;

    if (checkBottomDate && bottomDateLessOrEqualDate && checkTopDate && topDateGreaterOrEqualDate) {
      this.viewDate = copyNewDate;
      return;
    }

    if (checkBottomDate && this.calendarSettings.bottomDate! > copyNewDate) {
      this.viewDate = copyNewDate;
      return;
    }

    if (checkTopDate && this.calendarSettings.topDate! < copyNewDate) {
      this.viewDate = copyNewDate;
      return;
    }

    this.viewDate = copyNewDate;
  }
}