import { CalendarSelectedDatesSettings, CalendarSettings, CalendarType } from "@oasis/calendar";

/**
 * Настройки для календаря с динамическим изменением свойств
 */
export class CalendarSettingsDynamicChange {
  // Основные настройки календарей для oasis-library
  public calendarSettingsMulti: CalendarSettings;
  public calendarSettingsSingle: CalendarSettings;

  /** Отключение календарей */
  public disabled: boolean = false;

  private millisecondsInDay = 1000 * 60 * 60 * 24;

  /** Сдвиг дней для календарей */
  private offsetDays = 1;

  public constructor() {
    this.calendarSettingsMulti = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingle = new CalendarSettings(false, false, undefined, undefined);
  }

  /** Отключить календари */
  public setDisabled(): void {
    this.calendarSettingsMulti.isDisabled = this.disabled;
    this.calendarSettingsSingle.isDisabled = this.disabled;
  }

  /**
   * Установить график в календаре
   * * Когда происходит установка списка дней в календаре для выбора конкретных дат
   * * То происходит расчёт границы дат для календаря (topDate и bottomDate), если границы ещё не заданы
   * * Как следствие, при повторной задачи дней, расчёт не происходит
   * * Поэтому необходимо сбросить границы для календаря
   */
  public setGraph(): void {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let dates = new CalendarSelectedDatesSettings();
    dates.color = '#4C9338';
    dates.days = [
      new Date(today.getTime() + (this.millisecondsInDay * this.offsetDays)),
      new Date(today.getTime() + (this.millisecondsInDay) + (this.millisecondsInDay * this.offsetDays))
    ];

    this.calendarSettingsMulti.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsMulti.topDate = null;
    this.calendarSettingsMulti.bottomDate = null;
    this.calendarSettingsMulti.calendarDatesSettings = [dates];

    this.calendarSettingsSingle.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsSingle.topDate = null;
    this.calendarSettingsSingle.bottomDate = null;
    this.calendarSettingsSingle.calendarDatesSettings = [dates];

    this.offsetDays++;
  }
}