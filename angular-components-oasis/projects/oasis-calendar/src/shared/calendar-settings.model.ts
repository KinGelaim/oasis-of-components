import { EventEmitter } from '@angular/core';

import { DateHelper } from '../helpers/date-helper.class';
import { CalendarDate } from '../interfaces/calendar-date.interface';
import { CalendarTableGeneratorService } from '../services/calendar-table-generator.service';
import { CalendarService } from '../services/calendar.service';
import { CalendarDisabledDatesSettings } from './calendar-disabled-dates-settings.model';
import { CalendarSelectedDatesSettings } from './calendar-selected-dates-settings.model';
import { CalendarSize } from './calendar-size.enum';
import { CalendarType } from './calendar-type.enum';
import { CalendarUnit } from './calendar-unit.enum';
import { CalendarWorkScheduleSettings } from './calendar-work-schedule-settings.model';
import { Weekday } from './weekday.enum';

/**
 * Хранит настройки для календаря
 */
export class CalendarSettings {
  /** Цвет текста для дней по умолчанию ($color-primary-600) */
  public defaultFontColor: string = '#1669a1';

  /** Цвет фона для дней по умолчанию - цвета нет, т.к. берётся из стилей css */
  public defaultBackgroundColorItem: string = '';

  /** Цвет выделенного текста для дней по умолчанию ($color-white-background) */
  public defaultSelectedFontColor: string = '#ffffff';

  /** Цвет фона для выбранных дней по умолчанию ($color-primary-600) */
  public defaultSelectedBackgroundColorItem: string = '#1669a1';

  /** Цвет текста по умолчанию для отключенных элементов ($color-neutral-500) */
  public defaultDisabledFontColor: string = '#bdbdbd';

  /** Цвет основной иконки календаря ($color-primary-600) */
  public calendarIconColor: string = '#1669a1';

  /** Цвет иконок стрелочек ($color-primary-600) */
  public arrowsIconColor: string = '#1669a1';

  /** Настройки для заданных дат */
  private _calendarDatesSettings: CalendarSelectedDatesSettings[] | null = null;

  /** Получение настроек для заданных дат */
  public get calendarDatesSettings(): CalendarSelectedDatesSettings[] | null {
    return this._calendarDatesSettings;
  }

  /** Установка значения для заданных дат */
  public set calendarDatesSettings(value: CalendarSelectedDatesSettings[] | null) {
    this._calendarDatesSettings = value;

    // Установка верхней и нижней границы из заданных дат, если границы не заданы
    if (this._calendarDatesSettings != null && (this.bottomDate == null || this.topDate == null)) {
      let minDate = new Date();
      let maxDate = new Date();

      this._calendarDatesSettings.forEach(item => {
        item.days.forEach(dateValue => {
          if (dateValue < minDate) {
            minDate = dateValue;
          }
          if (dateValue > maxDate) {
            maxDate = dateValue;
          }
        });
      });

      this.bottomDate = this.bottomDate ?? minDate;
      this.topDate = this.topDate ?? maxDate;
    }
  }

  /** Настройки для графика работы */
  private _calendarWorkScheduleSettings: CalendarWorkScheduleSettings | null = null;

  /** Получение настроек для графика работы */
  public get calendarWorkScheduleSettings(): CalendarWorkScheduleSettings | null {
    return this._calendarWorkScheduleSettings;
  }

  /** Установка значения для графика работы */
  public set calendarWorkScheduleSettings(value: CalendarWorkScheduleSettings | null) {
    this._calendarWorkScheduleSettings = value;

    // Пересчёт нижней границы, если она не задана
    if (this._calendarWorkScheduleSettings != null
        && this._calendarWorkScheduleSettings.startDateWorkSchedule != null
        && this.bottomDate == null) {
      this.bottomDate = new Date(this._calendarWorkScheduleSettings.startDateWorkSchedule);
    }
  }

  /** Ширина календаря */
  private _width: number | null = null;

  /** Задаём ширину календаря */
  public set width(value: number | null) {
    this._width = value;
    this.calculateFullWidth();
  }

  /** Единица измерения ширины */
  private _typeWidth: CalendarUnit = CalendarUnit.None;

  /** Задаём единицу измерения ширины */
  public set typeWidth(value: CalendarUnit) {
    this._typeWidth = value;
    this.calculateFullWidth();
  }

  /** Полная ширина календаря (ширина + ед. измерения) */
  public fullWidth: string = '';

  /** Колбэк наружу выбранной даты */
  public callbackDate: EventEmitter<Date | null>;

  /** Колбэк наружу выбранных дат */
  public callbackDates: EventEmitter<[Date | null, Date | null]>;

  /** Колбэк наружу закрытия календаря */
  public callbackCloseCalendar: EventEmitter<boolean>;

  /** Колбэк для установки на определённую дату с обратным возвратом значения */
  public callbackSetDateWithEmit: EventEmitter<Date>;

  /** Колбэк для установки на определённую дату без обратного вызова */
  public callbackSetDateWithoutEmit: EventEmitter<Date>;

  /** Колбэк для установки на определённую дату с обратным возвратом значения для множественного календаря */
  public callbackSetDatesWithEmit: EventEmitter<[Date | null, Date | null]>;

  /** Колбэк для установки на определённую дату без обратного вызова для множественного календаря */
  public callbackSetDatesWithoutEmit: EventEmitter<[Date | null, Date | null]>;

  /** Колбэк для установки даты на "Сегодня" */
  public callbackSetToday: EventEmitter<any>;

  /** Колбэк для стирание даты */
  public callbackClearDate: EventEmitter<boolean>;

  /** Сервис для работы с датами */
  private _calendarService: CalendarService | null = null;

  /** Установка сервиса для работы с датами */
  public set calendarService(value: CalendarService) {
    this._calendarService = value;
  }

  /** Сервис для работы с отображением дат */
  private _calendarTableGeneratorService: CalendarTableGeneratorService | null = null;

  /** Установка сервиса для работы с отображением дат */
  public set calendarTableGeneratorService(value: CalendarTableGeneratorService) {
    this._calendarTableGeneratorService = value;
  }

  /**
   * Конструктор для создания основных настроек компонента Календарь
   * @param multiSelectable выбор диапазона значений
   * @param reversible возможность выбора дат в обратную сторону
   * @param bottomDate ограничение нижней даты
   * @param topDate ограничение верхней даты
   * @param isDisabled календарь отключён
   * @param isErrorType календарь в режиме ошибки - красная обводка
   * @param isCalendarIconWork открытие календаря по иконке
   * @param isCover включение области для перекрытия кликов вне календаря и активации события закрытия календаря при клике вне него
   * @param width ширина календаря
   * @param typeWidth единица измерения ширины
   * @param height высота календаря
   * @param typeHeight единица измерения высоты
   * @param calendarSize размер календаря
   * @param onlyIcon не отображать текст выбранной даты, остаётся только иконка
   * @param calendarBackgroundColor цвет календаря, если не задан, то ставится стандартный
   * @param beginDate предустановленная дата в календаре
   * @param beginDates предустановленные даты в двойном календаре
   * @param beginViewDate первоначальная дата, с которой будет открываться календарь
   * @param baseDate базовая дата, вокруг этой даты строится календарь
   * @param isNeedHorizontalReverse открыть модальное окно в другую сторону по горизонтали (вручную)
   * @param isNeedVerticalReverse открыть модальное окно в другую сторону по вертикали (вручную)
   * @param isNeedCalculateVerticalReverse надо ли рассчитать и открыть модально окно в другую сторону по вертикали (автоматически)
   * @param calendarType тип отображения дат в календаре с доступностью выбора дней
   * @param excludeWeekDays какие дни недели нужно исключить из календаря (для типа CalendarType.excludeWeekDays)
   * @param calendarSelectedDatesSettings настройки для заданных дат (включает их), используются заданные цвета, если нет, то  цвет по умолчанию (для типа CalendarType.SelectedDays)
   * @param calendarDisabledDatesSettings настройки для заданных дат (отключает их), используются заданные цвета (для любого типа календаря)
   * @param calendarWorkScheduleSettings настройки для календаря с графиком работы
   * @param coloredDays список дней и цвет для выделения в обычном календаре
   */
  public constructor(
    public multiSelectable: boolean = false,
    public reversible: boolean = true,
    public bottomDate: Date | null = null,
    public topDate: Date | null = null,
    public isDisabled: boolean = false,
    public isErrorType: boolean = false,
    public isCalendarIconWork: boolean = true,
    public isCover: boolean = true,
    width: number | null = null,
    typeWidth: CalendarUnit = CalendarUnit.None,
    public height: number | null = null,
    public typeHeight: CalendarUnit = CalendarUnit.None,
    public calendarSize: CalendarSize = CalendarSize.Medium,
    public onlyIcon: boolean = false,
    public calendarBackgroundColor: string | null = null,
    public beginDate: Date | null = null,
    public beginDates: [Date | null, Date | null] = [null, null],
    public beginViewDate: Date = new Date(),
    public baseDate: Date = new Date(),
    public isNeedHorizontalReverse: boolean = false,
    public isNeedVerticalReverse: boolean = false,
    public isNeedCalculateVerticalReverse: boolean = false,
    public calendarType: CalendarType = CalendarType.None,
    public excludeWeekDays: Weekday = Weekday.None,
    calendarSelectedDatesSettings: CalendarSelectedDatesSettings[] | null = null,
    public calendarDisabledDatesSettings: CalendarDisabledDatesSettings[] | null = null,
    calendarWorkScheduleSettings: CalendarWorkScheduleSettings | null = null,
    public coloredDays: CalendarSelectedDatesSettings[] | null = null
  ) {
    this.callbackDate = new EventEmitter();
    this.callbackDates = new EventEmitter();
    this.callbackSetDateWithEmit = new EventEmitter();
    this.callbackSetDateWithoutEmit = new EventEmitter();
    this.callbackSetDatesWithEmit = new EventEmitter();
    this.callbackSetDatesWithoutEmit = new EventEmitter();
    this.callbackSetToday = new EventEmitter();
    this.callbackClearDate = new EventEmitter();
    this.callbackCloseCalendar = new EventEmitter();

    // Откидываем часы для построения календаря
    this.baseDate = DateHelper.CopyDateWithoutTime(baseDate);

    if (this.multiSelectable) {
      this.beginDates.forEach(element => element = element != null ? DateHelper.CopyDateWithoutTime(element) : null);
    } else {
      this.beginDate = this.beginDate != null ? DateHelper.CopyDateWithoutTime(this.beginDate) : null;
    }

    this.width = width;
    this.typeWidth = typeWidth;
    this.calendarDatesSettings = calendarSelectedDatesSettings;
    this.calendarWorkScheduleSettings = calendarWorkScheduleSettings;
  }

  /**
   * Метод, который возвращает выбранную дату (для календаря с одиночным выбором)
   */
  public getSelectedDate(): Date | null {
    return this._calendarService?.selectedDate ?? null;
  }

  /**
   * Метод, который возвращает выбранные даты (для календаря с множественным выбором)
   */
  public getSelectedDates(): [Date | null, Date | null] {
    return [this._calendarService?.selectedFirstDate ?? null, this._calendarService?.selectedSecondDate ?? null];
  }

  /**
   * Метод для проверки возможности установить дату в календаре
   * @param day проверяемая дата
   * @returns возвращает true, если дату можно выбрать
   */
  public checkPossibleSelectDate(day: Date): boolean {
    let refDate = DateHelper.CopyDateWithoutTime(day);

    this._calendarTableGeneratorService?.generateDays(refDate, this._calendarService?.selectedDate ?? null, this._calendarService?.selectedFirstDate ?? null, this._calendarService?.selectedSecondDate ?? null);

    let calendarDay: CalendarDate | null = this._calendarTableGeneratorService?.getDayFromArray(refDate) ?? null;

    if (calendarDay == null || calendarDay.isDisabled) {
      return false;
    }

    return true;
  }

  /**
   * Рассчитать полную ширину календаря 
   */
  private calculateFullWidth() {
    this.fullWidth = this._width != null && this._typeWidth != CalendarUnit.None
      ? (this._width) + (this._typeWidth)
      : '';
  }
}