import { EventEmitter } from "@angular/core";
//import { HintBoxSettings, HintBoxTrianglePlace } from "@oasis/hint-box";

import { DigitInputActions } from "../classes/digit-input-actions.class";
import { DigitInputValidate } from "../classes/digit-input-validate.class";
import { DigitInputRegularExpression } from "./digit-input-regular-expression.enum";
import { DigitInputSize } from "./digit-input-size.enum";
import { DigitInputTextAlign } from "./digit-input-text-align.enum";
import { DigitInputType } from "./digit-input-type.enum";
import { DigitInputUnit } from "./digit-input-unit.enum";
import { DigitInputVisualType } from "./digit-input-visual-type.enum";

/**
 * Хранит настройки для поля ввода
 */
export class DigitInputSettings {
  /** Объект для валидации вводимых значений */
  private _inputValidate: DigitInputValidate = new DigitInputValidate();

  /** Объект для работы с полем ввода */
  private _inputActions: DigitInputActions = new DigitInputActions();

  /** Достигнуто максимальное значение */
  public isAchieveMaxValue: boolean = false;

  /** Достигнуто минимальное значение */
  public isAchieveMinValue: boolean = false;

  /** Старое валидное значение */
  public oldValidValue: string = '';

  /** Визуальный тип поля ввода */
  private _visualType: DigitInputVisualType = DigitInputVisualType.ButtonsBothSide;

  /** Получение визуального типа поля */
  public get visualType(): DigitInputVisualType {
    return this._visualType;
  }

  /** Установка визуального типа поля ввода */
  public set visualType(digitInputVisualType: DigitInputVisualType) {
    if (digitInputVisualType == DigitInputVisualType.TableCell) {
      this.setValue('', false);
    }

    if (digitInputVisualType != DigitInputVisualType.TableCell && this._visualType == DigitInputVisualType.TableCell) {
      this.setValue('0', true);
    }

    this._visualType = digitInputVisualType;
  }

  /** Значение поля ввода */
  private _value: string = '0';

  /** Получения значения поля ввода */
  public get value(): string {
    return this._value;
  }

  /** Видимое значение */
  public get visibleValue(): string {
    return this.value.replace('.', ',');
  }

  /** Регулярное выражение */
  private _regularExpression: DigitInputRegularExpression = DigitInputRegularExpression.Integer;

  /** Получение регулярного выражения */
  public get regularExpression(): DigitInputRegularExpression {
    return this._regularExpression;
  }

  /** Установка регулярного выражения */
  public set regularExpression(value: DigitInputRegularExpression) {
    this._regularExpression = value;

    // Накатываем placeholder для типа ячейки
    switch (Number(value)) {
      case DigitInputRegularExpression.Integer:
        this.placeholder = '0';
        this.substringNumber(0);
        break;

      case DigitInputRegularExpression.FractionalToTenths:
        this.placeholder = '0,0';
        this.substringNumber(1);
        break;

      case DigitInputRegularExpression.FractionalToHundredths:
        this.placeholder = '0,00';
        this.substringNumber(2);
        break;
    }
  }

  /** Максимальное значение */
  private _maxValue: number | null = null;

  /** Получение максимального значения */
  public get maxValue(): number | null {
    return this._maxValue;
  }

  /** Установка максимального значения */
  public set maxValue(value: number | null) {
    this._maxValue = value;
    this.setHintBoxText();
  }

  /** Минимальное значение */
  private _minValue: number | null = null;

  /** Получение минимального значения */
  public get minValue(): number | null {
    return this._minValue;
  }

  /** Установка минимального значения */
  public set minValue(value: number | null) {
    this._minValue = value;
    this.setHintBoxText();
  }

  /** Текущие настройки подсказки */
  //public hintBoxSettings!: HintBoxSettings;

  /** Колбэк для очистки значения c обратным вызовом */
  public callbackClearValueWithEmit: EventEmitter<boolean>;

  /** Колбэк для очистки значения без обратного вызова */
  public callbackClearValueWithoutEmit: EventEmitter<boolean>;

  /**
   * Конструктор создания настроек
   * @param size размер текста поля ввода
   * @param visualType визуальный тип поля ввода
   * @param type тип поля ввода
   * @param placeholder текст подсказки
   * @param isReadOnly только для чтения или нет
   * @param isReturnValidValue возвращать или нет валидное после blur
   * @param value значение поля ввода
   * @param maxValue максимальное значение
   * @param minValue минимальное значение
   * @param stepValue шаг изменения значения
   * @param widthComponent ширина компонента
   * @param widthComponentUnit единица измерения компонента
   * @param widthInput ширина поля ввода
   * @param widthInputUnit единица измерения ширины
   * @param regularExpression регулярное выражение
   * @param textAlign расположение текста относительное блока
   */
  public constructor(
    public size: DigitInputSize = DigitInputSize.Sixteen,
    visualType: DigitInputVisualType = DigitInputVisualType.ButtonsBothSide,
    public type: DigitInputType = DigitInputType.Normal,
    public placeholder: string = '',
    public isReadOnly: boolean = false,
    public isReturnValidValue: boolean = true,
    value: string = '0',
    maxValue: number | null = null,
    minValue: number | null = null,
    public stepValue: number = 1,
    public widthComponent: number = 250,
    public widthComponentUnit: DigitInputUnit = DigitInputUnit.None,
    public widthInput: number = 150,
    public widthInputUnit: DigitInputUnit = DigitInputUnit.Pixel,
    regularExpression: DigitInputRegularExpression = DigitInputRegularExpression.Integer,
    public textAlign: DigitInputTextAlign = DigitInputTextAlign.Center
  ) {
    //this.hintBoxSettings = new HintBoxSettings();
    //this.hintBoxSettings.trianglePlace = HintBoxTrianglePlace.Top;
    //this.hintBoxSettings.maxWidth = 165;

    this.maxValue = maxValue;
    this.minValue = minValue;
    this.visualType = visualType;
    this.regularExpression = regularExpression;
    this.setValue(value, true);

    this.callbackClearValueWithEmit = new EventEmitter();
    this.callbackClearValueWithoutEmit = new EventEmitter();
  }

  /**
   * Обрезка номера после правки регулярного выражения
   * @param length длина для обрезания
   */
  public substringNumber(length: number): void {
    if (this.value == '') {
      return;
    }

    // Делим на части, чтобы обрезать число
    let parts = Number(this.value.replace(',', '.')).toString().split('.');
    if (parts.length == 1) {
      this.setValue(parts[0], true);
      return;
    }

    let newValue = length == 0 ? parts[0] : parts[0] + '.' + parts[1].substring(0, length);
    this.setValue(newValue, true);
  }

  /**
   * Установка значения с проверкой на длину и валидность
   * @param value значение
   * @param isNeedSetFractionalPart необходимость добавлять дробную часть
   */
  public setValue(value: string | null, isNeedSetFractionalPart: boolean): void {
    if (value == null) {
      this._value = '';
      return;
    }

    value = value.replace(',', '.');

    this._value = this._inputValidate.validateInputValue(value, this);
    this._inputActions.checkAchievedEdgeRange(this);

    // Добавляем недостающие части, если ввод через кнопку
    if (isNeedSetFractionalPart) {
      this._value = this.addFractionalPart(this._value);
    }
  }

  /**
   * Добавление дробной части
   * @param value текущее значение поля ввода
   * @returns измененное значение поля ввода
   */
  public addFractionalPart(value: string): string {
    // Если значение пустое, но ничего добавлять не надо
    if (value == '' && this.visualType == DigitInputVisualType.TableCell) {
      return value;
    }

    switch (Number(this.regularExpression)) {
      case DigitInputRegularExpression.FractionalToTenths:
        if (value.indexOf('.') == -1) {
          return value + '.0';
        }

        if (value.indexOf('.') == value.length - 1) {
          return value + '0';
        }

        return value;

      case DigitInputRegularExpression.FractionalToHundredths:
        if (value.indexOf('.') == -1) {
          return value + '.00';
        }

        if (value.indexOf('.') == value.length - 1) {
          return value + '00';
        }

        if (value.indexOf('.') == value.length - 2) {
          return value + '0';
        }

        return value;

      default:
        return value;
    }
  }

  /**
   * Установка текста для всплывающей подсказки
   */
  public setHintBoxText(): void {
    //this.hintBoxSettings.text = `Допустимое значение <br> от ${this.minValue} до ${this.maxValue}`;
  }
}