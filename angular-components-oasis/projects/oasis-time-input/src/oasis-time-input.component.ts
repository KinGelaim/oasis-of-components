import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TimeInputSettings } from './shared/time-input-settings.class';
import { TimeInputType } from './shared/time-input-type.enum';
import { TimeInputUnit } from './shared/time-input-unit.enum';
import { TimeInputVisualType } from './shared/time-input-visual-type.enum';

@Component({
  selector: 'oasis-time-input',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-time-input.component.html',
  styleUrl: 'oasis-time-input.component.scss'
})
export class OasisTimeInputComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public timeInputSettings!: TimeInputSettings;

  /** Передача значения поля */
  @Output()
  public onValueChange: EventEmitter<[number | null, number | null]> = new EventEmitter<[number | null, number | null]>();

  /** Передача события blur */
  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события focus*/
  @Output()
  public onFocus: EventEmitter<any> = new EventEmitter<any>();

  /** Алиас типа временного поля */
  public TimeInputType = TimeInputType;

  /** Алиас типа единицы измерения */
  public TimeInputUnit = TimeInputUnit;

  /** Алиас визуального типа компонента */
  public TimeInputVisualType = TimeInputVisualType;

  /** Компонент находится в фокусе */
  public isFocus: boolean = false;

  /** На компонент наведён курсор */
  public isHover: boolean = false;

  /** Разрешённые специальные клавиши */
  private readonly CODE_SPECIAL_KEYS: string[] = ['Delete', 'Backspace', 'Tab', 'Esc', 'Return / Enter', 'ArrowRight', 'ArrowLeft', 'End', 'Home',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

  /** Разрешённые комбинации клавиш */
  private readonly CODE_HOT_KEYS: string[] = ['A', 'a', 'Ф', 'ф', 'C', 'c', 'С', 'с', 'V', 'v', 'М', 'м', 'X', 'x', 'Ч', 'ч', 'Z', 'z', 'Я', 'я'];

  /** Начальная позиция для смещения каретки */
  private readonly BEGIN_SKIP_POSITION = 3;

  /** Конечная позиция для смещения каретки */
  private readonly END_SKIP_POSITION = 6;

  /** Предыдущее значение компонента */
  private oldValue: string = '';

  /** Компонент находится в наведении или фокусе */
  private get isHoverOrFocus(): boolean {
    return this.isFocus || this.isHover;
  }

  /** Компонент в нормальном состоянии */
  private get isNormalType(): boolean {
    return this.timeInputSettings.type == TimeInputType.Normal;
  }

  /** Компонент в состоянии ошибки */
  private get isErrorType(): boolean {
    return this.timeInputSettings.type == TimeInputType.Error;
  }

  /** Компонент отключён */
  public get isDisableType(): boolean {
    return this.timeInputSettings.type == TimeInputType.Disable;
  }

  /** Компонент в стандартном визуальном типе */
  private get isDefaultVisualType(): boolean {
    return this.timeInputSettings.visualType == TimeInputVisualType.Default;
  }

  /** Компонент в табличном визуальном типе */
  private get isTableVisualType(): boolean {
    return this.timeInputSettings.visualType == TimeInputVisualType.TableCell;
  }

  /** Цвет фона компонента */
  public get backgroundColor(): string {
    if (this.isDefaultVisualType) {
      return 'transparent';
    }

    if (this.isDisableType) {
      return this.timeInputSettings.disableBackgroundColor;
    }

    return this.timeInputSettings.backgroundColor;
  }

  /** Цвет обводки компонента */
  public get borderColor(): string {
    if (this.isDisableType) {
      return this.timeInputSettings.disableBorderColor;
    }

    if (this.isTableVisualType && this.isErrorType) {
      return this.timeInputSettings.errorColor;
    }

    const isSetBackgroundColor = this.timeInputSettings.backgroundColor != null;

    if (!this.isHoverOrFocus && this.isNormalType && isSetBackgroundColor) {
      return this.timeInputSettings.backgroundColor;
    }

    return this.timeInputSettings.borderColor;
  }

  /** Цвет шрифта в компоненте */
  public get fontColor(): string | null {
    if (this.isDisableType) {
      return this.timeInputSettings.disableFontColor;
    }

    if (this.isDefaultVisualType && this.isErrorType) {
      return this.timeInputSettings.errorColor;
    }

    const isSetBorderColor = this.timeInputSettings.borderColor != null;

    if (this.isHoverOrFocus && this.isDefaultVisualType && isSetBorderColor) {
      return this.timeInputSettings.borderColor;
    }

    return this.timeInputSettings.fontColor;
  }

  /**
   * Установить новое значение
   * @param event событие из поля ввода
   */
  public setInputValue(event: any): void {
    this.timeInputSettings.setValue(event.target.value);

    let selectionStart = event.target.selectionStart;

    const newValue = this.timeInputSettings.value;
    event.target.value = newValue;

    if (this.oldValue != newValue && selectionStart == this.BEGIN_SKIP_POSITION) {
      selectionStart = this.END_SKIP_POSITION;
    }

    event.target.setSelectionRange(selectionStart, selectionStart);
    this.oldValue = newValue;

    this.onValueChange.emit(this.timeInputSettings.getValue());
  }

  /**
   * Нажата клавиша
   * @param event событие из поля ввода
   */
  public keyDown(event: any): void {
    const isKeyDownNumber = (event.key >= '0' && event.key <= '9') || (event.key >= 'NumPad 0' && event.key <= 'NumPad 9');
    const isKeyDownSpace = event.key == ' ';
    const isKeyDownColon = event.key == ':';
    const isKeyDownSpecialKeys = this.CODE_SPECIAL_KEYS.indexOf(event.key) > -1 || (event.ctrlKey && this.CODE_HOT_KEYS.indexOf(event.key) > -1);

    if (!isKeyDownNumber && !isKeyDownSpace && !isKeyDownColon && !isKeyDownSpecialKeys) {
      event.preventDefault();
    }
  }

  /**
   * Установить статус наведения
   * @param status новый статус
   */
  public setHover(status: boolean): void {
    this.isHover = status;
  }

  /**
   * Выполнение действия при установке фокуса
   * @event событие поля ввода
   */
  public setInputFocus(event: any): void {
    this.isFocus = true;
    this.onFocus.emit(event);
  }

  /**
   * Выполнение действия при потере фокуса
   * @event событие поля ввода
   */
  public setInputBlur(event: any): void {
    this.isFocus = false;
    this.onBlur.emit(event);
  }
}