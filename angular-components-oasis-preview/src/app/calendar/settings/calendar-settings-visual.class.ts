import { CalendarSettings, CalendarSize, CalendarUnit } from "@oasis/calendar";

/**
 * Настройки календаря и методы
 * для тестовой страницы
 * (с изменением внешнего вида)
 */
export class CalendarSettingsVisual {
  // Основные настройки календарей для отключения календарей
  public calendarSettingsMultiDisable: CalendarSettings;
  public calendarSettingsSingleDisable: CalendarSettings;

  // Отключение календарей
  public disabled: boolean = false;


  // Основные настройки календарей для oasis-library
  public calendarSettingsMultiError: CalendarSettings;
  public calendarSettingsSingleError: CalendarSettings;

  // Отключение календарей
  public errored: boolean = false;


  // Основные настройки календарей для изменения ширины и высоты
  public calendarSettingsMultiWidthHeight: CalendarSettings;
  public calendarSettingsSingleWidthHeight: CalendarSettings;

  public CalendarUnit = CalendarUnit;


  // Основные настройки календарей для смены размеров
  public calendarSettingsMultiSize: CalendarSettings;
  public calendarSettingsSingleSize: CalendarSettings;

  public CalendarSize = CalendarSize;


  // Основные настройки календарей для иконок
  public calendarSettingsSingleOnlyIcon1: CalendarSettings;
  public calendarSettingsSingleOnlyIcon2: CalendarSettings;
  public calendarSettingsSingleOnlyIcon3: CalendarSettings;
  public calendarSettingsSingleOnlyIcon4: CalendarSettings;
  public calendarSettingsSingleOnlyIcon5: CalendarSettings;
  public calendarSettingsSingleOnlyIcon6: CalendarSettings;
  public calendarSettingsSingleOnlyIcon7: CalendarSettings;
  public calendarSettingsSingleOnlyIcon8: CalendarSettings;
  public calendarSettingsSingleOnlyIcon9: CalendarSettings;
  public calendarSettingsSingleOnlyIcon10: CalendarSettings;

  // Основные настройки для календарей, которые автоматически открываются вверх
  public calendarSettingsMultiAutomaticVertical: CalendarSettings;
  public calendarSettingsSingleAutomaticVertical: CalendarSettings;

  // Основные настройки для календарей, которые вручную открываются вверх
  public calendarSettingsMultiHandleVertical: CalendarSettings;
  public calendarSettingsSingleHandleVertical: CalendarSettings;

  // Радужный календарь
  public calendarSettingsMultiRainbowCalendar: CalendarSettings;
  public calendarSettingsSingleRainbowCalendar: CalendarSettings;

  public constructor() {
    this.calendarSettingsMultiDisable = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleDisable = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsMultiError = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleError = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsMultiWidthHeight = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleWidthHeight = new CalendarSettings(false, false, undefined, undefined);

    this.calendarSettingsMultiSize = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsSingleSize = new CalendarSettings(false, false, undefined, undefined);

    // Календари - иконки
    this.calendarSettingsSingleOnlyIcon1 = this.createIconCalendar(40);
    this.calendarSettingsSingleOnlyIcon2 = this.createIconCalendar(40, '#f2e5ff');
    this.calendarSettingsSingleOnlyIcon3 = this.createIconCalendar(40, '', true);
    this.calendarSettingsSingleOnlyIcon4 = this.createIconCalendar(40, '#f2e5ff', true);
    this.calendarSettingsSingleOnlyIcon5 = this.createIconCalendar(40, '#f2994a', false);
    this.calendarSettingsSingleOnlyIcon5.calendarIconColor = 'white';
    this.calendarSettingsSingleOnlyIcon6 = this.createIconCalendar(32, '', false, CalendarSize.Small);
    this.calendarSettingsSingleOnlyIcon7 = this.createIconCalendar(32, '#f2e5ff', false, CalendarSize.Small);
    this.calendarSettingsSingleOnlyIcon8 = this.createIconCalendar(32, '', true, CalendarSize.Small);
    this.calendarSettingsSingleOnlyIcon9 = this.createIconCalendar(32, '#f2e5ff', true, CalendarSize.Small);
    this.calendarSettingsSingleOnlyIcon10 = this.createIconCalendar(32, '#f2994a', false, CalendarSize.Small);
    this.calendarSettingsSingleOnlyIcon10.isNeedHorizontalReverse = true;
    this.calendarSettingsSingleOnlyIcon10.calendarIconColor = 'white';

    // Открытие вверх календарей
    this.calendarSettingsMultiAutomaticVertical = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiAutomaticVertical.isNeedCalculateVerticalReverse = true;
    this.calendarSettingsSingleAutomaticVertical = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleAutomaticVertical.isNeedCalculateVerticalReverse = true;

    this.calendarSettingsMultiHandleVertical = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiHandleVertical.isNeedVerticalReverse = true;
    this.calendarSettingsSingleHandleVertical = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleHandleVertical.isNeedVerticalReverse = true;

    // Радужный календарь
    this.calendarSettingsMultiRainbowCalendar = new CalendarSettings(true, false, undefined, undefined);
    this.calendarSettingsMultiRainbowCalendar.calendarIconColor = 'purple';
    this.calendarSettingsMultiRainbowCalendar.arrowsIconColor = 'green';
    this.calendarSettingsMultiRainbowCalendar.defaultFontColor = 'red';
    this.calendarSettingsMultiRainbowCalendar.defaultSelectedFontColor = 'blue';
    this.calendarSettingsMultiRainbowCalendar.defaultSelectedBackgroundColorItem = 'pink';
    this.calendarSettingsMultiRainbowCalendar.defaultDisabledFontColor = 'black';
    
    this.calendarSettingsSingleRainbowCalendar = new CalendarSettings(false, false, undefined, undefined);
    this.calendarSettingsSingleRainbowCalendar.calendarIconColor = 'purple';
    this.calendarSettingsSingleRainbowCalendar.arrowsIconColor = 'green';
    this.calendarSettingsSingleRainbowCalendar.defaultFontColor = 'red';
    this.calendarSettingsSingleRainbowCalendar.defaultSelectedFontColor = 'blue';
    this.calendarSettingsSingleRainbowCalendar.defaultSelectedBackgroundColorItem = 'pink';
    this.calendarSettingsSingleRainbowCalendar.defaultDisabledFontColor = 'black';
  }

  /** Отключить календари */
  public setDisabled(): void {
    this.calendarSettingsMultiDisable.isDisabled = this.disabled;
    this.calendarSettingsSingleDisable.isDisabled = this.disabled;
  }

  /** Изменение типа календаря */
  public setError(): void {
    this.calendarSettingsMultiError.isErrorType = this.errored;
    this.calendarSettingsSingleError.isErrorType = this.errored;
  }

  /** Изменить ширину календаря */
  public changeWidth(event: any): void {
    this.calendarSettingsMultiWidthHeight.width = event.target.value;
    this.calendarSettingsSingleWidthHeight.width = event.target.value;
  }

  /** Изменить тип ширины календаря */
  public changeCalendarWidth(event: any): void {
    this.calendarSettingsMultiWidthHeight.typeWidth = event.target.value;
    this.calendarSettingsSingleWidthHeight.typeWidth = event.target.value;
  }

  /** Изменить высоту календаря */
  public changeHeight(event: any): void {
    this.calendarSettingsMultiWidthHeight.height = event.target.value;
    this.calendarSettingsSingleWidthHeight.height = event.target.value;
  }

  /** Изменить тип высоты календаря */
  public changeCalendarHeight(event: any): void {
    this.calendarSettingsMultiWidthHeight.typeHeight = event.target.value;
    this.calendarSettingsSingleWidthHeight.typeHeight = event.target.value;
  }

  /** Смена размеров календарей */
  public changeSize(event: any): void {
    this.calendarSettingsMultiSize.calendarSize = event.target.value;
    this.calendarSettingsSingleSize.calendarSize = event.target.value;
  }

  /** Создание календаря - иконки */
  private createIconCalendar(widthHeight: number, color: string = '', isDisabled: boolean = false, calendarSize: CalendarSize = CalendarSize.Medium): CalendarSettings {
    let calendarSettings = new CalendarSettings(false, false, undefined, undefined);
    calendarSettings.onlyIcon = true;
    calendarSettings.width = widthHeight;
    calendarSettings.typeWidth = CalendarUnit.Pixel;
    calendarSettings.height = widthHeight;
    calendarSettings.typeHeight = CalendarUnit.Pixel;
    calendarSettings.isDisabled = isDisabled;
    calendarSettings.calendarSize = calendarSize;

    if (color) {
      calendarSettings.calendarBackgroundColor = color;
    }

    return calendarSettings;
  }

  /** Смена цвета основной иконки календаря */
  public changeMainIconColor(event: any): void {
    const newColor = event.target.value;
    this.calendarSettingsMultiRainbowCalendar.calendarIconColor = newColor;
    this.calendarSettingsSingleRainbowCalendar.calendarIconColor = newColor;
  }

  /** Смена цвета у стрелочек */
  public changeArrowsIconColor(event: any): void {
    const newColor = event.target.value;
    this.calendarSettingsMultiRainbowCalendar.arrowsIconColor = newColor;
    this.calendarSettingsSingleRainbowCalendar.arrowsIconColor = newColor;
  }

  /** Смена основного цвета в календаре */
  public changeDefaultFontColor(event: any): void {
    const newColor = event.target.value;
    this.calendarSettingsMultiRainbowCalendar.defaultFontColor = newColor;
    this.calendarSettingsSingleRainbowCalendar.defaultFontColor = newColor;
  }

  /** Смена цвета текста у выбранного элемента */
  public changeDefaultSelectedFontColor(event: any): void {
    const newColor = event.target.value;
    this.calendarSettingsMultiRainbowCalendar.defaultSelectedFontColor = newColor;
    this.calendarSettingsSingleRainbowCalendar.defaultSelectedFontColor = newColor;
  }

  /** Смена цвета фона у выбранного элемента */
  public changeDefaultSelectedBackgroundColor(event: any): void {
    const newColor = event.target.value;
    this.calendarSettingsMultiRainbowCalendar.defaultSelectedBackgroundColorItem = newColor;
    this.calendarSettingsSingleRainbowCalendar.defaultSelectedBackgroundColorItem = newColor;
  }

  /** Смена цвета текста у отключённых элементов */
  public changeDefaultDisabledFontColor(event: any): void {
    const newColor = event.target.value;
    this.calendarSettingsMultiRainbowCalendar.defaultDisabledFontColor = newColor;
    this.calendarSettingsSingleRainbowCalendar.defaultDisabledFontColor = newColor;
  }
}