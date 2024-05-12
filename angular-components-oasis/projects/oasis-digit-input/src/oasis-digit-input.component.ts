import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { DigitInputRegularExpression } from './shared/digit-input-regular-expression.enum';
import { DigitInputSettings } from './shared/digit-input-settings.class';
import { DigitInputType } from './shared/digit-input-type.enum';
import { DigitInputUnit } from './shared/digit-input-unit.enum';
import { DigitInputVisualType } from './shared/digit-input-visual-type.enum';

@Component({
  selector: 'oasis-digit-input',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-digit-input.component.html',
  styleUrl: 'oasis-digit-input.component.scss'
})
export class OasisDigitInputComponent implements OnInit, OnDestroy {
  /** Входящие настройки для работы компонента */
  @Input()
  public digitInputSettings!: DigitInputSettings;

  /** Передача значения поля */
  @Output()
  public onValueChange: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события focus */
  @Output()
  public onFocus: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события blur */
  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события keyPress */
  @Output()
  public onKeyPress: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события keyDown */
  @Output()
  public onKeyDown: EventEmitter<any> = new EventEmitter<any>();
  
  /** Передача события keyUp */
  @Output()
  public onKeyUp: EventEmitter<any> = new EventEmitter<any>();

  /** Получение ширины загрузчика */
  public get widthLoader(): string {
    let margin = 4;
    return this.digitInputSettings.widthInputUnit != DigitInputUnit.None
      ? this.digitInputSettings.widthInput - margin + this.digitInputSettings.widthInputUnit
      : 'auto';
  }

  /** Алиас типа расположения кнопок относительно текста */
  public DigitInputVisualType = DigitInputVisualType;

  /** Алиас единицы измерения компонента */
  public DigitInputUnit = DigitInputUnit;

  /** Алиас типа поля ввода */
  public DigitInputType = DigitInputType;

  /** Подписка для очистки значения c обратным вызовом */
  private subscriptionOnClearWithValue!: Subscription;

  /** Подписка для очистки значения без обратного вызова */
  private subscriptionOnClearWithoutValue!: Subscription;

  public ngOnInit(): void {
    this.subscriptionOnClearWithValue = this.digitInputSettings.callbackClearValueWithEmit.subscribe(this.clearCurrentValueWithEmit.bind(this));
    this.subscriptionOnClearWithoutValue = this.digitInputSettings.callbackClearValueWithoutEmit.subscribe(this.clearCurrentValueWithoutEmit.bind(this));
  }

  public ngOnDestroy(): void {
    this.subscriptionOnClearWithValue?.unsubscribe();
    this.subscriptionOnClearWithoutValue?.unsubscribe();
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

  /**
   * Очистка выбранного значения c emit
   */
  private clearCurrentValueWithEmit(): void {
    this.clearCurrentValue(true);
  }

  /**
   * Очистка выбранного значения без emit
   */
  private clearCurrentValueWithoutEmit(): void {
    this.clearCurrentValue(false);
  }

  /**
   * Очистка выбранного значения
   * * Если обычное поле ввода, то сброс в 0
   * * Если поле ввода в виде ячейки, то будет пустое значение
   * @param isEmit с обратным вызовом или нет
   */
  private clearCurrentValue(isEmit: boolean): void {
    let value = this.digitInputSettings.visualType != DigitInputVisualType.TableCell ? '0' : null;
    this.digitInputSettings.setValue(value, true);

    if (isEmit) {
      this.onValueChange.emit(this.digitInputSettings.value);
    }
  }

  /**
   * Установка значения
   */
  public setInputValue(event: any): void {
    this.digitInputSettings.setValue(event.target.value, false);
    event.target.value = this.digitInputSettings.value.replace('.', ',');
    this.onValueChange.emit(this.digitInputSettings.value);
  }

  /**
   * Выполнение действия при потере фокуса
   */
  public setInputBlur(event: any): void {
    if (this.digitInputSettings.type == DigitInputType.Error && this.digitInputSettings.isReturnValidValue) {
      this.digitInputSettings.setValue(this.digitInputSettings.oldValidValue, true);
    }

    // Если пусто, то подставляем старое значение
    if (this.digitInputSettings.value == '') {
      this.digitInputSettings.setValue(this.digitInputSettings.oldValidValue, true);
    }

    // Если значение было пустым, мы ввели что-то невалидное и потом вышли
    if (this.digitInputSettings.oldValidValue == '' && this.digitInputSettings.type == DigitInputType.Error) {
      this.digitInputSettings.type = DigitInputType.Normal;
    }

    event.target.value = this.digitInputSettings.addFractionalPart(this.digitInputSettings.value).replace('.', ',');

    this.onValueChange.emit(event.target.value.replace(',', '.'));
    this.onBlur.emit(event);
  }

  /**
   * Выполнения действия при установке фокуса на поле ввода
   */
  public setInputFocus(event: any): void {
    this.digitInputSettings.oldValidValue = this.digitInputSettings.value;

    this.onFocus.emit(event);
  }

  /**
   * Сдвигаем значение на определенный шаг
   * @param isAddedStep шаг в большую сторону?
   */
  public offsetByStep(isAddedStep: boolean): void {
    let fixedNumber = this.getFixedNumber();
    let stepValue = Number(this.digitInputSettings.stepValue.toFixed(fixedNumber));

    // Если значение никакое не выбрано, то начинаем от нуля добавлять/убавлять значение
    if (this.digitInputSettings.value == '') {
      let value: number = isAddedStep ? stepValue : -stepValue;
      this.digitInputSettings.setValue(value.toString(), true);
      return;
    }

    // Если значение есть, то добавляем или вычитаем выбранный шаг
    let value = Number(this.digitInputSettings.value.replace(',', '.'));
    value += isAddedStep ? stepValue : - stepValue;
    value = Number(value.toFixed(fixedNumber));

    // Проверяем на выход за границы и обрезаем до границы, если выходим
    value = this.digitInputSettings.maxValue != null && value > this.digitInputSettings.maxValue ? this.digitInputSettings.maxValue : value;
    value = this.digitInputSettings.minValue != null && value < this.digitInputSettings.minValue ? this.digitInputSettings.minValue : value;

    this.digitInputSettings.setValue(value.toString(), true);
    this.onValueChange.emit(this.digitInputSettings.value);
  }

  /**
   * Получение значения для округления
   * @returns число знаков после запятой
   */
  private getFixedNumber(): number {
    let fixedNumber = 0;

    switch (Number(this.digitInputSettings.regularExpression)) {
      case DigitInputRegularExpression.FractionalToTenths:
        fixedNumber = 1;
        break;

      case DigitInputRegularExpression.FractionalToHundredths:
        fixedNumber = 2;
        break;
    }

    return fixedNumber;
  }
}