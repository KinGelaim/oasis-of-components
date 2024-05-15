import { EventEmitter } from "@angular/core";

import { ShortCalendarSize } from "./short-calendar-size.enum";
import { ShortCalendarTypeIcon } from "./short-calendar-type-icon.enum";
import { ShortCalendarUnit } from "./short-calendar-unit.enum";
import { ShortCalendarSendDate } from "./short-calendar-send-date.model";
import { ShortCalendarMonth } from "../models/short-calendar-month.model";
import { ShortCalendarDates } from "../interfaces/short-calendar-dates.interface";
import { ShortCalendarDate } from "./short-calendar-date.interface";

/**
 * Хранит настройки для календаря
 */
export class ShortCalendarSettings {
  /** Цвет иконки в выключенном состоянии в виде иконки */
  public backgroundColorDisabledIcon: string = '#BDBDBD';

  /** Дата относительно которой надо переворачивать календарь в гидрогоде (10 апреля) */
  public humpDateForHydroYear: ShortCalendarDate = { month: 3, dayNumber: 10 };

  /** Выбранные в календаре даты */
  public selectedDates!: ShortCalendarDates;

  /** Выключенные дни у календаря */
  public disabledDates: ShortCalendarDate[] = [];

  /** Весь список месяцев по строкам */
  public allMonth: ShortCalendarMonth[][] = [
    [
      new ShortCalendarMonth(0, 'Январь', 'Января', 31),
      new ShortCalendarMonth(1, 'Февраль', 'Февраля', 28),
      new ShortCalendarMonth(2, 'Март', 'Марта', 31)
    ],
    [
      new ShortCalendarMonth(3, 'Апрель', 'Апреля', 30),
      new ShortCalendarMonth(4, 'Май', 'Мая', 31),
      new ShortCalendarMonth(5, 'Июнь', 'Июня', 30)
    ],
    [
      new ShortCalendarMonth(6, 'Июль', 'Июля', 31),
      new ShortCalendarMonth(7, 'Август', 'Августа', 31),
      new ShortCalendarMonth(8, 'Сентябрь', 'Сентября', 30)
    ],
    [
      new ShortCalendarMonth(9, 'Октябрь', 'Октября', 31),
      new ShortCalendarMonth(10, 'Ноябрь', 'Ноября', 30),
      new ShortCalendarMonth(11, 'Декабрь', 'Декабря', 31)
    ]
  ];

  /** Колбэк наружу выбора даты */
  public callbackDate: EventEmitter<ShortCalendarSendDate>;

  /** Колбэк наружу выбора двух дат */
  public callbackDates: EventEmitter<[ShortCalendarSendDate, ShortCalendarSendDate]>;

  /** Колбэк для стирание дат */
  public callbackClearDate: EventEmitter<boolean>;

  /** Колбэк для установки на определённую дату с обратным возвратом значения */
  public callbackSetDateWithEmit: EventEmitter<ShortCalendarDate>;

  /** Колбэк для установки на определённую дату без обратного вызова */
  public callbackSetDateWithoutEmit: EventEmitter<ShortCalendarDate>;

  /** Колбэк для установки на определённые даты (двойной) с обратным возвратом значения */
  public callbackSetDatesWithEmit: EventEmitter<[ShortCalendarDate | null, ShortCalendarDate | null]>;

  /** Колбэк для установки на определённые даты (двойной) без обратного вызова */
  public callbackSetDatesWithoutEmit: EventEmitter<[ShortCalendarDate | null, ShortCalendarDate | null]>;

  /**
   * Конструктор для создания основных настроек компонента Упрощенный Календарь
   * @param multiSelectable выбор диапазона значений
   * @param selectedEqualsDates выбор одной и той же даты дважды при двойном
   * @param isDisabled календарь отключён
   * @param isCalendarIconWork открытие календаря по иконке
   * @param isCover включение области для перекрытия кликов вне календаря и активации события закрытия календаря при клике вне него
   * @param isHydroYear является ли выбор дат для гидрогода
   * @param width ширина календаря
   * @param widthUnit единица измерения ширины
   * @param height высота календаря
   * @param heightUnit единица измерения высоты
   * @param calendarSize размер календаря
   * @param onlyIcon не отображать текст выбранной даты, остаётся только иконка
   * @param typeIcon тип отображаемой иконки
   * @param calendarBackgroundColor цвет календаря, если не задан, то ставится стандартный
   * @param isNeedHorizontalReverse открыть модальное окно в другую сторону по горизонтали (вручную)
   * @param baseDate базовая дата, вокруг этой даты строится календарь
   */
  public constructor(
    public multiSelectable: boolean = false,
    public selectedEqualsDates: boolean = true,
    public isDisabled: boolean = false,
    public isCalendarIconWork: boolean = true,
    public isCover: boolean = true,
    public isHydroYear: boolean = false,
    public width: number | null = null,
    public widthUnit: ShortCalendarUnit = ShortCalendarUnit.None,
    public height: number | null = null,
    public heightUnit: ShortCalendarUnit = ShortCalendarUnit.None,
    public calendarSize: ShortCalendarSize = ShortCalendarSize.Medium,
    public onlyIcon: boolean = false,
    public typeIcon: ShortCalendarTypeIcon = ShortCalendarTypeIcon.Dark,
    public calendarBackgroundColor: string | null = null,
    public isNeedHorizontalReverse: boolean = false,
    public baseDate: Date = new Date()
  ) {
    this.callbackClearDate = new EventEmitter();
    this.callbackDate = new EventEmitter();
    this.callbackDates = new EventEmitter();
    this.callbackSetDateWithEmit = new EventEmitter();
    this.callbackSetDateWithoutEmit = new EventEmitter();
    this.callbackSetDatesWithEmit = new EventEmitter();
    this.callbackSetDatesWithoutEmit = new EventEmitter();
  }

  /**
   * Установка количества дней у февраля
   * @param isLeapYear високосный ли год
   */
  public setDaysFebruary(isLeapYear: boolean): void {
    let numberMonthFebruary = 1;
    let countDaysLeap = 29;
    let countDaysOrdinary = 28;

    for (let row of this.allMonth) {
      for (let month of row) {
        if (month.number == numberMonthFebruary) {
          month.countDays = isLeapYear ? countDaysLeap : countDaysOrdinary;
          return;
        }
      }
    }
  }

  /**
   * Метод, который возвращает выбранную дату
   */
  public getSelectedDate(): ShortCalendarSendDate | null {
    let currentDates = this.selectedDates;
    return currentDates == null
      ? null
      : new ShortCalendarSendDate(currentDates.firstMonth?.number ?? null, currentDates.firstDayNumber);
  }

  /**
   * Метод, который возвращает выбранные даты (множественный выбор)
   */
  public getSelectedDates(): ShortCalendarSendDate[] | null {
    let currentDates = this.selectedDates;
    return currentDates == null
      ? null
      : [new ShortCalendarSendDate(currentDates.firstMonth?.number ?? null, currentDates.firstDayNumber),
        new ShortCalendarSendDate(currentDates.secondMonth?.number ?? null, currentDates.secondDayNumber)];
  }
}