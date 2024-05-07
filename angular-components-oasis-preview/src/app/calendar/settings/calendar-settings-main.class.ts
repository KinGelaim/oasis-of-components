import { CalendarSettings, CalendarUnit } from "@oasis/calendar";

/**
 * Настройки календаря и методы
 * для тестовой страницы
 */
export class CalendarSettingsMain {
  // Основные настройки календарей
  public calendarSettingsMulti: CalendarSettings;
  public calendarSettingsSingleBottomDate: CalendarSettings;
  public calendarSettingsSingleTopDate: CalendarSettings;

  // Настройки календаря с множественным выбором
  public calendarReverseSelectable = false;
  public calendarBottomDateBounded = true;
  public calendarTopDateBounded = true;

  // Вывод дат из календаря с множественным выбором
  public firstMultiDate: Date | null = null;
  public secondMultiDate: Date | null = null;

  // Вывод дат из одиночных календарей
  public bottomDate: Date | null = null;
  public topDate: Date | null = null;

  public constructor() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    this.calendarSettingsMulti = new CalendarSettings(true, this.calendarReverseSelectable, undefined, undefined);
    this.calendarSettingsMulti.beginDate = new Date(today);

    this.calendarSettingsSingleBottomDate = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleBottomDate.beginDate = new Date(today);

    this.calendarSettingsSingleTopDate = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleTopDate.calendarBackgroundColor = '#f2e5ff';
    this.calendarSettingsSingleTopDate.width = 182;
    this.calendarSettingsSingleTopDate.typeWidth = CalendarUnit.Pixel;
    this.calendarSettingsSingleTopDate.isNeedHorizontalReverse = true;
    this.calendarSettingsSingleTopDate.beginDate = new Date(today);

    this.getBottomDate(new Date(today));
    this.getTopDate(new Date(today));

    this.calendarSettingsSingleBottomDate.callbackDate.subscribe(this.getBottomDate.bind(this));
    this.calendarSettingsSingleTopDate.callbackDate.subscribe(this.getTopDate.bind(this));

    this.calendarSettingsMulti.callbackDates.subscribe(this.getMultiFirstDate.bind(this));

    this.calendarSettingsMulti.callbackCloseCalendar.subscribe(this.calendarClosed.bind(this));
  }

  /** Включение/отключение обратного выбора в календаре с диапазоном дат */
  public setCalendarReverseSelectable(calendarReverseSelectable: any): void {
    this.calendarSettingsMulti.reversible = calendarReverseSelectable.target.checked;
  }

  /** Включение/отключение нижнего ограничения дат для календаря с диапазоном дат */
  public setCalendarBottomDateBounded(calendarBottomDateBounded: any): void {
    if (calendarBottomDateBounded.target.checked) {
      this.calendarSettingsMulti.bottomDate = this.bottomDate;
    }
    else {
      this.calendarSettingsMulti.bottomDate = null;
    }
  }

  /** Включение/отключение верхнего ограничения дат для календаря с диапазоном дат */
  public setCalendarTopDateBounded(calendarTopDateBounded: any): void {
    if (calendarTopDateBounded.target.checked) {
      this.calendarSettingsMulti.topDate = this.topDate;
    } else {
      this.calendarSettingsMulti.topDate = null;
    }
  }

  /** Возврат значения из одиночного календаря с нижней границей */
  private getBottomDate(date: Date): void {
    console.log('Колбек из календаря с нижней границей');
    this.bottomDate = date;
    this.calendarSettingsMulti.bottomDate = date;
    this.calendarSettingsSingleTopDate.bottomDate = date;
    this.calendarBottomDateBounded = true;
  }

  /** Возврат значения из одиночного календаря с верхней границей */
  private getTopDate(date: Date): void {
    console.log('Колбек из календаря с верхней границей');
    this.topDate = date;
    this.calendarSettingsMulti.topDate = date;
    this.calendarSettingsSingleBottomDate.topDate = date;
    this.calendarTopDateBounded = true;
  }

  /** Возврат дат из календаря с выбором диапазона дат */
  private getMultiFirstDate(dates: [Date | null, Date | null]): void {
    console.log('Колбек из календаря с множественным выбором', dates);
    this.firstMultiDate = dates[0];
    this.secondMultiDate = dates[1];
  }

  /** Очистить дату в календаре с мультивыбором (с обратным вызовом) */
  public clearMultiDateWithEmit(): void {
    this.calendarSettingsMulti.callbackClearDate.emit(true);
  }

  /** Очистить дату в календаре с мультивыбором (без обратного вызова) */
  public clearMultiDateWithoutEmit(): void {
    this.calendarSettingsMulti.callbackClearDate.emit(false);
  }

  /** Установить граничные даты в календаре */
  public setMultiDatesWithEmit(): void {
    let dates: [Date | null, Date | null] = [null, null];

    if (this.bottomDate != null) {
      dates[0] = new Date(this.bottomDate);
    }

    if (this.topDate != null) {
      dates[1] = new Date(this.topDate);
    }

    this.calendarSettingsMulti.callbackSetDatesWithEmit.emit(dates);
  }

  /** Установить заданную дату в календаре с нижней границей */
  public setDateInBottomDate(): void {
    this.calendarSettingsSingleBottomDate.callbackSetDateWithEmit.emit(new Date(2022, 11, 22));
  }

  /** Установить заданную дату в календаре с нижней границей */
  public setDateInBottomDateWithoutEmit(): void {
    this.calendarSettingsSingleBottomDate.callbackSetDateWithoutEmit.emit(new Date(2022, 11, 22));
  }

  /** Удалить дату в календаре с нижней границей */
  public clearBottomDate(): void {
    this.calendarSettingsSingleBottomDate.callbackClearDate.emit();
    this.calendarBottomDateBounded = false;
    this.bottomDate = null;
    this.calendarSettingsMulti.bottomDate = null;
  }

  /** Получить даты из календарей */
  public getDates(): void {
    console.log('Значение в верхнем календаре:', this.calendarSettingsSingleBottomDate.getSelectedDate());
    console.log('Значение в двойном календаре:', this.calendarSettingsMulti.getSelectedDates());
  }

  /** Проверка даты на возможность установить в верхний календарь */
  public checkToday(): void {
    let today = new Date();

    let check = this.calendarSettingsSingleBottomDate.checkPossibleSelectDate(today);

    console.log(check ? 'Дату можно установить в верхний календарь' : 'Дату нельзя установить в верхний календарь', today);
  }

  /** Наведение на календарь с множественным выбором */
  public mouseenter(event: any): void {
    console.log('Мышка на календаре');
  }

  /** Убрана мышь с календаря с множественным выбором */
  public mouseleave(event: any): void {
    console.log('Убежала с календаря');
  }

  /** Когда был закрыт календарь с множественным выбором */
  public calendarClosed(): void {
    console.log('Календарь закрыт');
  }
}