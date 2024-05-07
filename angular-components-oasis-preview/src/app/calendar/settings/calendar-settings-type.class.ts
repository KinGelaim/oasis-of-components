import {
  CalendarSettings,
  CalendarType,
  CalendarSelectedDatesSettings,
  Weekday,
  CalendarWorkScheduleSettings,
  CalendarDisabledDatesSettings
} from "@oasis/calendar";

/**
 * Настройки календаря и методы
 * для тестовой страницы
 * (с разными графиками)
 */
export class CalendarSettingsType {
  // Основные настройки календарей для пятидневного режима
  public calendarSettingsMultiFiveDays: CalendarSettings;
  public calendarSettingsSingleFiveDays: CalendarSettings;

  public mondayDisable: boolean = false;
  public tuesdayDisable: boolean = false;
  public wednesdayDisable: boolean = false;
  public thursdayDisable: boolean = false;
  public fridayDisable: boolean = false;
  public saturdayDisable: boolean = false;
  public sundayDisable: boolean = false;

  // Основные настройки календарей для трёх выбранных дней
  public calendarSettingsMultiTwoDays: CalendarSettings;
  public calendarSettingsSingleTwoDays: CalendarSettings;

  // Основные настройки календарей для суток через трое дважды (без выделенного фона)
  public calendarSettingsMultiDayAfterThreeDouble: CalendarSettings;
  public calendarSettingsSingleDayAfterThreeDouble: CalendarSettings;

  // Основные настройки календарей для суток через трое (с фоном)
  public calendarSettingsMultiDayAfterThree: CalendarSettings;
  public calendarSettingsSingleDayAfterThree: CalendarSettings;

  // Основные настройки календарей для суток через трое (с фоном и стандартным цветом)
  public calendarSettingsMultiDayAfterThreeDefaultColor: CalendarSettings;
  public calendarSettingsSingleDayAfterThreeDefaultColor: CalendarSettings;

  private millisecondsInDay = 1000 * 60 * 60 * 24;
  private threeDays = 3;
  private fourDays = 4;

  // Настройки для календарей по графику работы
  public calendarSettingsStartDate: CalendarSettings;
  public calendarSettingsMultiWorkSchedule: CalendarSettings;
  public calendarSettingsSingleWorkSchedule: CalendarSettings;
  public startWorkDay: Date;
  public workCycleDays: number;

  // Настройки для обычного календаря, но с выделенными несколькими днями
  public calendarSettingsMultiColoredDays: CalendarSettings;
  public calendarSettingsSingleColoredDays: CalendarSettings;

  // Настройки для обычного календаря, но с отключёнными несколькими днями
  public calendarSettingsMultiDisabledDays: CalendarSettings;
  public calendarSettingsSingleDisabledDays: CalendarSettings;

  // Настройки для обычного календаря, но с отключёнными несколькими днями и разной расцветкой
  public calendarSettingsMultiDisabledDaysColor: CalendarSettings;
  public calendarSettingsSingleDisabledDaysColor: CalendarSettings;

  public constructor() {
    let redColor = '#C51620';
    let lightBlueColor = '#E8F2FF';
    let blackGreenColor = '#4C9338';
    let orangeColor = '#F2994A';
    let blackPinkColor = '#ED6068';
    let gray = '#EBEBEB';

    // Пятидневка
    this.calendarSettingsMultiFiveDays = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiFiveDays.calendarType = CalendarType.ExcludeWeekDays;
    this.calendarSettingsMultiFiveDays.excludeWeekDays = Weekday.Saturday;
    this.calendarSettingsMultiFiveDays.excludeWeekDays |= Weekday.Sunday;

    this.calendarSettingsSingleFiveDays = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleFiveDays.calendarType = CalendarType.ExcludeWeekDays;
    //this.calendarSettingsSingleFiveDays.excludeWeekDays = Weekday.wednesday | Weekday.friday;

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Три заданных дня одного цвета
    let dates = new CalendarSelectedDatesSettings();
    dates.days = [new Date(2022, 11, 20), new Date(today), new Date(today.getTime() + (this.threeDays * this.millisecondsInDay))];
    dates.color = redColor;
    dates.selectedColor = redColor;
    dates.selectedBackgroundColor = lightBlueColor;

    this.calendarSettingsMultiTwoDays = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiTwoDays.beginDates = [new Date(2022, 11, 20), new Date(today)];
    this.calendarSettingsMultiTwoDays.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsMultiTwoDays.calendarDatesSettings = [dates];

    this.calendarSettingsSingleTwoDays = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleTwoDays.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsSingleTwoDays.calendarDatesSettings = [dates];
    // Предустановленный день для календаря
    this.calendarSettingsSingleTwoDays.beginDate = dates.days[0];

    // Сутки через трое и сутки через трое 2 (без выделенного фона)
    let dates2 = new CalendarSelectedDatesSettings();
    dates2.color = redColor;
    dates2.selectedColor = redColor;
    dates2.selectedBackgroundColor = lightBlueColor;
    dates2.days = [new Date(today)];
    for (let i = 1; i < 10; i++) {
      dates2.days.push(new Date(today.getTime() + (i * this.fourDays * this.millisecondsInDay)));
    }

    let dates3 = new CalendarSelectedDatesSettings();
    dates3.color = blackGreenColor;
    dates3.selectedColor = blackGreenColor;
    dates3.selectedBackgroundColor = lightBlueColor;
    dates3.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    for (let i = 1; i < 10; i++) {
      dates3.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay)));
    }

    this.calendarSettingsMultiDayAfterThreeDouble = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiDayAfterThreeDouble.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsMultiDayAfterThreeDouble.calendarDatesSettings = [dates2, dates3];

    this.calendarSettingsSingleDayAfterThreeDouble = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleDayAfterThreeDouble.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsSingleDayAfterThreeDouble.calendarDatesSettings = [dates2, dates3];

    // Сутки через трое
    let dates4 = new CalendarSelectedDatesSettings();
    dates4.color = blackPinkColor;
    dates4.selectedColor = blackPinkColor;
    dates4.days = [...dates2.days];

    let dates5 = new CalendarSelectedDatesSettings();
    dates5.color = blackGreenColor;
    dates5.selectedColor = blackGreenColor;
    dates5.days = [...dates3.days];

    this.calendarSettingsMultiDayAfterThree = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiDayAfterThree.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsMultiDayAfterThree.calendarDatesSettings = [dates4, dates5];

    this.calendarSettingsSingleDayAfterThree = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleDayAfterThree.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsSingleDayAfterThree.calendarDatesSettings = [dates4, dates5];

    // Сутки через трое с дефолтным цветом
    let dates6 = new CalendarSelectedDatesSettings();
    dates6.days = [...dates2.days];

    let dates7 = new CalendarSelectedDatesSettings();
    dates7.days = [...dates3.days];

    this.calendarSettingsMultiDayAfterThreeDefaultColor = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiDayAfterThreeDefaultColor.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsMultiDayAfterThreeDefaultColor.calendarDatesSettings = [dates6, dates7];

    this.calendarSettingsSingleDayAfterThreeDefaultColor = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleDayAfterThreeDefaultColor.calendarType = CalendarType.SelectedDays;
    this.calendarSettingsSingleDayAfterThreeDefaultColor.calendarDatesSettings = [dates6, dates7];

    // Календари по графику работы
    this.calendarSettingsStartDate = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsStartDate.callbackDate.subscribe(this.getBottomDate.bind(this));

    this.calendarSettingsMultiWorkSchedule = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiWorkSchedule.calendarType = CalendarType.WorkSchedule;

    this.calendarSettingsSingleWorkSchedule = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleWorkSchedule.calendarType = CalendarType.WorkSchedule;

    this.startWorkDay = new Date();
    this.workCycleDays = 3;

    this.setNewSettingsWorkSchedule();

    // Обычный календарик, но с выделенными несколькими днями
    this.calendarSettingsMultiColoredDays = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleColoredDays = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsSingleColoredDays.bottomDate = new Date(Date.now() - this.millisecondsInDay * 2);

    let dates8 = new CalendarSelectedDatesSettings();
    dates8.color = blackGreenColor;
    dates8.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    let dates9 = new CalendarSelectedDatesSettings();
    dates9.color = orangeColor;
    dates9.selectedBackgroundColor = orangeColor;
    dates9.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    for (let i = 1; i < 10; i++) {
      dates8.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay)));
      dates9.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay * 2)));
    }

    this.calendarSettingsMultiColoredDays.coloredDays = [dates8];
    this.calendarSettingsSingleColoredDays.coloredDays = [dates8, dates9];

    // Обычный календарик, но с отключёнными несколькими днями
    this.calendarSettingsMultiDisabledDays = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleDisabledDays = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsSingleColoredDays.bottomDate = new Date(Date.now() - this.millisecondsInDay * 2);

    let dates10 = new CalendarDisabledDatesSettings();
    dates10.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    let dates11 = new CalendarDisabledDatesSettings();
    dates11.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    for (let i = 1; i < 10; i++) {
      dates10.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay)));
      dates11.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay * 2)));
    }

    this.calendarSettingsMultiDisabledDays.calendarDisabledDatesSettings = [dates10];
    this.calendarSettingsSingleDisabledDays.calendarDisabledDatesSettings = [dates10, dates11];

    // Обычный календарик, но с отключёнными несколькими днями (цветной)
    this.calendarSettingsMultiDisabledDaysColor = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleDisabledDaysColor = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsSingleColoredDays.bottomDate = new Date(Date.now() - this.millisecondsInDay * 2);

    let dates12 = new CalendarDisabledDatesSettings();
    dates12.color = blackGreenColor;
    dates12.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    let dates13 = new CalendarDisabledDatesSettings();
    dates13.color = blackPinkColor;
    dates13.backgroundColor = gray;
    dates13.days = [new Date(today.getTime() + (this.millisecondsInDay))];
    for (let i = 1; i < 10; i++) {
      dates12.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay)));
      dates13.days.push(new Date(dates2.days[i].getTime() + (this.millisecondsInDay * 2)));
    }

    this.calendarSettingsMultiDisabledDaysColor.calendarDisabledDatesSettings = [dates12];
    this.calendarSettingsSingleDisabledDaysColor.calendarDisabledDatesSettings = [dates12, dates13];
  }

  /** Включение/отключение дня недели в календаре */
  public disableWeekday(): void {
    if (this.mondayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Monday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Monday;
    }

    if (this.tuesdayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Tuesday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Tuesday;
    }

    if (this.wednesdayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Wednesday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Wednesday;
    }

    if (this.thursdayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Thursday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Thursday;
    }

    if (this.fridayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Friday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Friday;
    }

    if (this.saturdayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Saturday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Saturday;
    }

    if (this.sundayDisable) {
      this.calendarSettingsSingleFiveDays.excludeWeekDays |= Weekday.Sunday;
    } else {
      this.calendarSettingsSingleFiveDays.excludeWeekDays &= ~Weekday.Sunday;
    }

    this.calendarSettingsSingleFiveDays.callbackClearDate.emit();
  }

  /** Возврат значения из одиночного календаря со стартовой датой */
  private getBottomDate(date: Date): void {
    this.startWorkDay = new Date(date);
    this.setNewSettingsWorkSchedule();
  }

  /** Получение цикла рабочих дней */
  public changeWorkCycleDays(event: any): void {
    this.workCycleDays = event.target.value;
    this.setNewSettingsWorkSchedule();
  }

  /** Установить новые настройки для календаря с графиком работы */
  private setNewSettingsWorkSchedule(): void {
    this.calendarSettingsMultiWorkSchedule.bottomDate = null;
    this.calendarSettingsSingleWorkSchedule.bottomDate = null;

    this.calendarSettingsMultiWorkSchedule.calendarWorkScheduleSettings = new CalendarWorkScheduleSettings(new Date(this.startWorkDay), this.workCycleDays);
    this.calendarSettingsSingleWorkSchedule.calendarWorkScheduleSettings = new CalendarWorkScheduleSettings(new Date(this.startWorkDay), this.workCycleDays);

    this.calendarSettingsMultiWorkSchedule.callbackClearDate.emit();
    this.calendarSettingsSingleWorkSchedule.callbackClearDate.emit();
  }

  /** Очистка цветных календарей с отключёнными днями */
  public clearMultiDate(): void {
    this.calendarSettingsMultiDisabledDaysColor.callbackClearDate.emit(true);
    this.calendarSettingsSingleDisabledDaysColor.callbackClearDate.emit(true);
  }
}