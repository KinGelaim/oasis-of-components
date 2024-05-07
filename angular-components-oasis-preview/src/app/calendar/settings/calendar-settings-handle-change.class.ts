import { EventEmitter } from "@angular/core";
import { CalendarSettings } from "@oasis/calendar";

/**
 * Ручное открытие календаря и "обертка" календаря
 */
export class CalendarSettingsHandleChanged {
  // Основные настройки календарей для закрытие через код
  public calendarSettingsMultiOnlyClose: CalendarSettings;
  public calendarSettingsSingleOnlyClose: CalendarSettings;

  public changeVisibleCalendarFirst: EventEmitter<boolean>;

  // Основные настройки календарей для открытия и закрытия через код
  public calendarSettingsMultiOpenClose: CalendarSettings;
  public calendarSettingsSingleOpenClose: CalendarSettings;

  public isOpenCalendarSecond: boolean = false;

  public changeVisibleCalendarSecond: EventEmitter<boolean>;

  // Основные настройки календарей для открытия через код
  public calendarSettingsMultiOnlyOpen: CalendarSettings;
  public calendarSettingsSingleOnlyOpen: CalendarSettings;

  public changeVisibleCalendarThird: EventEmitter<boolean>;

  public constructor() {
    this.calendarSettingsMultiOnlyClose = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleOnlyClose = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsMultiOnlyClose.isCover = false;
    this.calendarSettingsSingleOnlyClose.isCover = false;

    this.changeVisibleCalendarFirst = new EventEmitter<boolean>();


    this.calendarSettingsMultiOpenClose = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleOpenClose = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsMultiOpenClose.isCover = false;
    this.calendarSettingsMultiOpenClose.isCalendarIconWork = false;
    this.calendarSettingsSingleOpenClose.isCover = false;
    this.calendarSettingsSingleOpenClose.isCalendarIconWork = false;

    this.changeVisibleCalendarSecond = new EventEmitter<boolean>();


    this.calendarSettingsMultiOnlyOpen = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleOnlyOpen = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsMultiOnlyOpen.isCalendarIconWork = false;
    this.calendarSettingsSingleOnlyOpen.isCalendarIconWork = false;

    this.changeVisibleCalendarThird = new EventEmitter<boolean>();
  }

  /** Закрыть календари (закрытие только через код) */
  public setInvisibleCalendarFirst(): void {
    this.changeVisibleCalendarFirst.emit(false);
  }

  /** Открыть календари (открытие и закрытие через код) */
  public setVisibleCalendarSecond(): void {
    this.isOpenCalendarSecond = true;
    this.changeVisibleCalendarSecond.emit(true);
  }

  /** Закрыть календари (открытие и закрытие через код) */
  public setInvisibleCalendarSecond(): void {
    this.isOpenCalendarSecond = false;
    this.changeVisibleCalendarSecond.emit(false);
  }

  /** Открыть календари (открытие только через код) */
  public setVisibleCalendarThird(): void {
    this.changeVisibleCalendarThird.emit(true);
  }
}