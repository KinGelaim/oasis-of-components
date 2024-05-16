import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TextInputIconPosition } from './shared/text-input-icon-position.enum';
import { TextInputSettings } from './shared/text-input-settings.class';
import { TextInputType } from './shared/text-input-type.enum';
import { TextInputUnit } from './shared/text-input-unit.enum';

@Component({
  selector: 'oasis-text-input',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-text-input.component.html',
  styleUrl: 'oasis-text-input.component.scss'
})
export class OasisTextInputComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public textInputSettings!: TextInputSettings;

  /** Передача значения поля */
  @Output()
  public onValueChange: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события blur */
  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события focus*/
  @Output()
  public onFocus: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события keyPress*/
  @Output()
  public onKeyPress: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события keyDown*/
  @Output()
  public onKeyDown: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события keyUp*/
  @Output()
  public onKeyUp: EventEmitter<any> = new EventEmitter<any>();

  /** Алиас типа поля ввода */
  public TextInputType = TextInputType

  /** Алиас расположения иконки */
  public TextInputIconPosition = TextInputIconPosition;

  /** Алиас единицы измерения компонента */
  public TextInputUnit = TextInputUnit;

  /**
   * Установка значения с применением регулярного выражения
   */
  public setInputValue(event: any): void {
    this.textInputSettings.setValue(event.target.value, true);
    event.target.value = this.textInputSettings.value;
    this.onValueChange.emit(this.textInputSettings.value);
  }

  /**
   * Выполнение действия при установке фокуса
   */
  public setInputFocus(event: any): void {
    this.onFocus.emit(event);
  }

  /**
   * Выполнение действия при потере фокуса
   */
  public setInputBlur(event: any): void {
    this.onBlur.emit(event);
  }

  /**
   * Выполнение действия при нажатии клавиши
   */
  public setInputKeyPress(event: any): void {
    this.onKeyPress.emit(event);
  }

  /**
   * Выполнение действия при опускании клавиши вниз
   */
  public setInputKeyDown(event: any): void {
    this.onKeyDown.emit(event);
  }

  /**
   * Выполнение действия при поднятии клавиши вверх
   */
  public setInputKeyUp(event: any): void {
    this.onKeyUp.emit(event);
  }
}