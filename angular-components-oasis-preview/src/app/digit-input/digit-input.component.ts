import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DigitInputRegularExpression, DigitInputSettings, DigitInputSize, DigitInputTextAlign, DigitInputType, DigitInputUnit, DigitInputVisualType, OasisDigitInputComponent } from '@oasis/digit-input';

@Component({
  selector: 'app-digit-input',
  standalone: true,
  imports: [FormsModule, OasisDigitInputComponent],
  templateUrl: './digit-input.component.html',
  styleUrl: './digit-input.component.scss'
})
export class DigitInputComponent {
  /** Текущие настройки */
  public digitInputSettings!: DigitInputSettings;

  /** Алиас визуального типа поля ввода */
  public DigitInputVisualType = DigitInputVisualType;

  /** Алиас типов размеров компонента */
  public DigitInputUnit = DigitInputUnit;

  /** Алиас типов регулярных выражений */
  public DigitInputRegularExpression = DigitInputRegularExpression;

  /** Алиас размеров поля ввода */
  public DigitInputSize = DigitInputSize;

  /** Алиас расположения текста */
  public DigitInputTextAlign = DigitInputTextAlign;

  /** Алиас типа поля ввода */
  public DigitInputType = DigitInputType;

  /** Текущее значением компонента */
  public currentValue: string = '';

  /** Код последней активной нажатой клавиши */
  public lastActionKeyCode: string = '';

  public constructor() {
    this.digitInputSettings = new DigitInputSettings();
    this.digitInputSettings.regularExpression = DigitInputRegularExpression.FractionalToHundredths;
    this.digitInputSettings.maxValue = 10;
    this.digitInputSettings.minValue = -50;
    this.digitInputSettings.stepValue = 2;
    this.digitInputSettings.visualType = DigitInputVisualType.TableCell;
    this.digitInputSettings.size = DigitInputSize.Fourteen;
  }

  /**
   * Изменение значения поля ввода
   */
  public setValue(event: any): void {
    this.digitInputSettings.setValue(event.target.value, false);
  }

  /**
   * Добавить нули
   */
  public addZeroToValue(event: any): void {
    event.target.value = this.digitInputSettings.addFractionalPart(event.target.value);
    this.digitInputSettings.setValue(event.target.value, false);
  }

  /**
   * Установка шага для кнопок
   */
  public setStepValue(event: any): void {
    let currentValue = this.checkIsNumber(event.target.value);
    if (currentValue != null) {
      this.digitInputSettings.stepValue = currentValue;
    }
  }

  /**
   * Установка максимального значения
   */
  public setMaxValue(event: any): void {
    let currentValue = this.checkIsNumber(event.target.value);
    if (currentValue != null) {
      this.digitInputSettings.maxValue = currentValue;
    }
  }

  /**
   * Установка минимального значения
   */
  public setMinValue(event: any): void {
    let currentValue = this.checkIsNumber(event.target.value);
    if (currentValue != null) {
      this.digitInputSettings.minValue = currentValue;
    }
  }

  /**
   * Проверяем является ли введенное значение числом
   * @param value значение
   */
  private checkIsNumber(value: any): number | null {
    let number = Number(value);

    // Если вдруг не число, то значит значение невалидное
    if (isNaN(number)) {
      console.log('Установленное значение не является числом');
      return null;
    }

    return number;
  }

  /**
   * Получение значение поля ввода
   */
  public getValue(value: string): void {
    this.currentValue = value;
  }

  /**
   * Сброс выбранного значения
   */
  public resetValue(isEmit: boolean): void{
    if (isEmit) {
      this.digitInputSettings.callbackClearValueWithEmit.emit();
    } else {
      this.digitInputSettings.callbackClearValueWithoutEmit.emit();
    }
  }

  /**
   * Изменение значения последней активной нажатой клавиши
   */
  public setLastActionKeyCode(event: any): void {
    this.lastActionKeyCode = event.code;
  }
}