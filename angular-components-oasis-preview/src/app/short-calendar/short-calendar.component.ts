import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisShortCalendarComponent, ShortCalendarDate, ShortCalendarSendDate, ShortCalendarSettings, ShortCalendarSize, ShortCalendarTypeIcon, ShortCalendarUnit } from '@oasis/short-calendar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-short-calendar',
  standalone: true,
  imports: [FormsModule, OasisShortCalendarComponent],
  templateUrl: './short-calendar.component.html',
  styleUrl: './short-calendar.component.scss'
})
export class ShortCalendarComponent implements OnInit, OnDestroy {
  /** Настройки для одиночного календаря */
  public shortCalendarSettingsSingle!: ShortCalendarSettings;

  /** Настройки для одиночного календаря с иконкой */
  public shortCalendarSettingsSingleIcon!: ShortCalendarSettings;

  /** Настройки для двойного календаря */
  public shortCalendarSettingsDouble!: ShortCalendarSettings;

  /** Алиас типа измерения ширины компонента */
  public ShortCalendarUnit = ShortCalendarUnit;

  /** Алиас типа размера календаря */
  public ShortCalendarSize = ShortCalendarSize;

  /** Отключение календарей */
  public isDisabled: boolean = false;

  /** Является ли год високосным */
  public isLeapYear: boolean = false;

  /** Выбранная дата в одиночном */
  public selectedDateSingle: string = '';

  /** Выбранная дата в одиночном с иконкой */
  public selectedDateSingleIcon: string = '';

  /** Выбранные даты двойного календаря */
  public selectedDatesDouble: string = '';

  /** Все выбранные на текущий момент даты */
  public allSelectedDates: string = '';

  /** Выключенные даты в календарях */
  public disabledDates: string = '';

  /** Подписка на получение даты */
  private subscriptionOnGetDateSingle!: Subscription;
  private subscriptionOnGetDateSingleIcon!: Subscription;
  private subscriptionOnGetDateDouble!: Subscription;

  public constructor() {
    this.shortCalendarSettingsSingle = new ShortCalendarSettings(false, false, undefined, undefined);
    this.shortCalendarSettingsSingleIcon = new ShortCalendarSettings(false, false, undefined, undefined);
    this.shortCalendarSettingsDouble = new ShortCalendarSettings(true, false, undefined, undefined);

    this.shortCalendarSettingsSingleIcon.width = 32;
    this.shortCalendarSettingsSingleIcon.widthUnit = ShortCalendarUnit.Pixel;
    this.shortCalendarSettingsSingleIcon.height = 32;
    this.shortCalendarSettingsSingleIcon.heightUnit = ShortCalendarUnit.Pixel;
    this.shortCalendarSettingsSingleIcon.onlyIcon = true;
    this.shortCalendarSettingsSingleIcon.typeIcon = ShortCalendarTypeIcon.Light;
    this.shortCalendarSettingsSingleIcon.calendarBackgroundColor = '#1AACCC';
    this.shortCalendarSettingsSingleIcon.calendarSize = ShortCalendarSize.Medium;
  }

  public ngOnInit(): void {
    this.subscriptionOnGetDateSingle = this.shortCalendarSettingsSingle.callbackDate.subscribe(this.getCurrentDateSingle.bind(this));
    this.subscriptionOnGetDateSingleIcon = this.shortCalendarSettingsSingleIcon.callbackDate.subscribe(this.getCurrentDateSingleIcon.bind(this));
    this.subscriptionOnGetDateDouble = this.shortCalendarSettingsDouble.callbackDates.subscribe(this.getCurrentDateDouble.bind(this));
  }

  public ngOnDestroy(): void {
    this.subscriptionOnGetDateSingle?.unsubscribe;
    this.subscriptionOnGetDateSingleIcon?.unsubscribe;
    this.subscriptionOnGetDateDouble?.unsubscribe;
  }

  /**
   * Получение выбранного значения
   */
  private getCurrentDateSingle(shortCalendarDate: ShortCalendarSendDate): void {
    this.selectedDateSingle = this.createDateString(shortCalendarDate);
  }

  /**
   * Получение выбранного значения
   */
  private getCurrentDateSingleIcon(shortCalendarDate: ShortCalendarSendDate): void {
    this.selectedDateSingleIcon = this.createDateString(shortCalendarDate);
  }

  /**
   * Получение выбранного значения
   */
  private getCurrentDateDouble(shortCalendarDates: [ShortCalendarSendDate, ShortCalendarSendDate]): void {
    this.selectedDatesDouble = this.createDateString(shortCalendarDates[0]) + ' ' + this.createDateString(shortCalendarDates[1]);
  }

  /**
   * Создание строки с датой по месяцу и числу дня
   * @param shortCalendarDate объект с данными
   * @returns строка в виде даты
   */
  private createDateString(shortCalendarDate: ShortCalendarSendDate): string {
    return shortCalendarDate.month == null || shortCalendarDate.dayNumber == null
      ? ''
      : new Date(2024, shortCalendarDate.month, shortCalendarDate.dayNumber).toDateString()
  }

  /**
   * Изменить ширину календаря
   * @param event событие со значением
   */
  public changeWidth(event: any): void {
    this.shortCalendarSettingsSingle.width = event.target.value;
    this.shortCalendarSettingsDouble.width = event.target.value;
  }

  /**
   * Изменить единицу измерения ширины
   * @param event событие со значением
   */
  public changeCalendarWidthUnit(event: any): void {
    this.shortCalendarSettingsSingle.widthUnit = event.target.value;
    this.shortCalendarSettingsDouble.widthUnit = event.target.value;
  }

  /**
   * Изменить высоту календаря
   * @param event событие со значением
   */
  public changeHeight(event: any): void {
    this.shortCalendarSettingsSingle.height = event.target.value;
    this.shortCalendarSettingsDouble.height = event.target.value;
  }

  /**
   * Изменить единицу измерения высоты
   * @param event событие со значением
   */
  public changeCalendarHeightUnit(event: any): void {
    this.shortCalendarSettingsSingle.heightUnit = event.target.value;
    this.shortCalendarSettingsDouble.heightUnit = event.target.value;
  }

  /**
   * Отключить календари
   */
  public setDisabled(): void {
    this.shortCalendarSettingsSingle.isDisabled = this.isDisabled;
    this.shortCalendarSettingsSingleIcon.isDisabled = this.isDisabled;
    this.shortCalendarSettingsDouble.isDisabled = this.isDisabled;
  }

  /**
   * Смена размеров календарей
   * @param event событие со значением
   */
  public changeSize(event: any): void {
    this.shortCalendarSettingsSingle.calendarSize = event.target.value;
    this.shortCalendarSettingsSingleIcon.calendarSize = event.target.value;
    this.shortCalendarSettingsDouble.calendarSize = event.target.value;
  }

  /**
   * Очистить дату в календаре (с обратным вызовом)
   */
  public clearDateWithEmit(): void {
    this.shortCalendarSettingsSingle.callbackClearDate.emit(true);
    this.shortCalendarSettingsSingleIcon.callbackClearDate.emit(true);
    this.shortCalendarSettingsDouble.callbackClearDate.emit(true);
  }

  /**
   * Очистить дату в календаре (без обратного вызова)
   */
  public clearDateWithoutEmit(): void {
    this.shortCalendarSettingsSingle.callbackClearDate.emit(false);
    this.shortCalendarSettingsSingleIcon.callbackClearDate.emit(false);
    this.shortCalendarSettingsDouble.callbackClearDate.emit(false);
  }

  /**
   * Можно ли выбрать одну и туже дату дважды
   * @param event событие со значением
   */
  public selectedEqualDates(event: any): void {
    this.shortCalendarSettingsDouble.selectedEqualsDates = event.target.checked;
  }

  /**
   * Установка сколько дней будет в феврале
   */
  public setDaysFebruary(): void {
    this.shortCalendarSettingsSingle.setDaysFebruary(this.isLeapYear);
    this.shortCalendarSettingsSingleIcon.setDaysFebruary(this.isLeapYear);
    this.shortCalendarSettingsDouble.setDaysFebruary(this.isLeapYear);
  }

  /**
   * Установка гидрогода
   * @param event событие со значением
   */
  public setHydroYear(event: any): void{
    this.shortCalendarSettingsDouble.isHydroYear = event.target.checked;
  }

  /**
   * Получение текущих выбранных дат в календарях
   */
  public getDates(): void {
    let firstCalendar = this.shortCalendarSettingsSingle.getSelectedDate();
    if (firstCalendar != null) {
      this.allSelectedDates = this.createDateString(firstCalendar);
    }

    let secondCalendar = this.shortCalendarSettingsSingleIcon.getSelectedDate();
    if (secondCalendar != null) {
      this.allSelectedDates += '<br>' + this.createDateString(secondCalendar);
    }

    let thirdCalendar = this.shortCalendarSettingsDouble.getSelectedDates();
    if (thirdCalendar != null) {
      this.allSelectedDates += '<br>' + this.createDateString(thirdCalendar[0]);
      this.allSelectedDates += ' - ' + this.createDateString(thirdCalendar[1]);
    }
  }

  /**
   * Установить случайную дату в календаре с обратным вызовом
   */
  public setDatesWithEmit(): void {
    this.shortCalendarSettingsSingle.callbackSetDateWithEmit.emit(this.generateDate());
    this.shortCalendarSettingsSingleIcon.callbackSetDateWithEmit.emit(this.generateDate());
    this.shortCalendarSettingsDouble.callbackSetDatesWithEmit.emit([this.generateDate(), this.generateDate()]);
  }

  /**
   * Установить случайную дату в календаре без обратного вызова
   */
  public setDatesWithoutEmit(): void {
    this.shortCalendarSettingsSingle.callbackSetDateWithoutEmit.emit(this.generateDate());
    this.shortCalendarSettingsSingleIcon.callbackSetDateWithoutEmit.emit(this.generateDate());
    this.shortCalendarSettingsDouble.callbackSetDatesWithoutEmit.emit([this.generateDate(), this.generateDate()]);
  }

  /**
   * Установить случайную дату в календаре с null вместо первой даты
   */
  public setDatesWithoutEmitWithNull(): void {
    this.shortCalendarSettingsDouble.callbackSetDatesWithEmit.emit([null, this.generateDate()]);
  }

  /**
   * Устанавливаем заблокированные даты
   */
  public setDisabledDates(): void {
    let date = this.generateDate();

    // Специальная проверка для Миши
    for (let disabledDate of this.shortCalendarSettingsSingle.disabledDates) {
      if (disabledDate.dayNumber == date.month && disabledDate.dayNumber == date.dayNumber) {
        return;
      }
    }

    this.shortCalendarSettingsSingle.disabledDates.push(date);
    this.shortCalendarSettingsSingleIcon.disabledDates.push(date);
    this.shortCalendarSettingsDouble.disabledDates.push(date);
    this.disabledDates += new Date(2024, date.month, date.dayNumber).toDateString() + '<br>';
  }

  /**
   * Заблокировать сегодняшнюю дату
   */
  public setDisableToday(): void {
    let date = { month: new Date().getMonth(), dayNumber: new Date().getDate() };

    // Специальная проверка для Миши
    for (let disabledDate of this.shortCalendarSettingsSingle.disabledDates) {
      if (disabledDate.month == date.month && disabledDate.dayNumber == date.dayNumber) {
        return;
      }
    }

    this.shortCalendarSettingsSingle.disabledDates.push(date);
    this.shortCalendarSettingsSingleIcon.disabledDates.push(date);
    this.shortCalendarSettingsDouble.disabledDates.push(date);
    this.disabledDates += new Date(2024, date.month, date.dayNumber).toDateString() + '<br>';
  }

  /**
   * Сброс выключенных дат
   */
  public clearDisabledDates(): void {
    this.shortCalendarSettingsSingle.disabledDates = [];
    this.shortCalendarSettingsSingleIcon.disabledDates = [];
    this.shortCalendarSettingsDouble.disabledDates = [];
    this.disabledDates = '';
  }

  /**
   * Создание дня
   */
  private generateDate(): ShortCalendarDate {
    let date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    return { month: date.getMonth(), dayNumber: date.getDate() }
  }
}