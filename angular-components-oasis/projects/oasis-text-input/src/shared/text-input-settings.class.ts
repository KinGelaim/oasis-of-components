import { TextInputIconPosition } from './text-input-icon-position.enum';
import { TextInputRegularExpressionExecute } from './text-input-regular-expression-execute.enum';
import { TextInputRegularExpression } from './text-input-regular-expression.enum';
import { TextInputSize } from './text-input-size.enum';
import { TextInputTextAlign } from './text-input-text-align.enum';
import { TextInputType } from './text-input-type.enum';
import { TextInputUnit } from './text-input-unit.enum';
import { TextInputValidate } from './text-input-validate.class';

/**
 * Хранит настройки для поля ввода
 */
export class TextInputSettings {
  /** Объект для валидации вводимых значений */
  private _inputValidate: TextInputValidate = new TextInputValidate();

  /** Тип поля ввода */
  private _type: string = '';

  /**
   * Получения типа поля ввода
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Смена типа и запуск валидации
   * @type тип поля ввода, которое должно быть установлено
   * @withValidate необходимость запуска валидации
   */
  public setType(type: string, withValidate: boolean = true): void {
    this._type = type;

    if (withValidate) {
      this._value = this._inputValidate.validateInputValue(this._value, this, false);
    }
  }

  /** Минимальное количество символов, которое нужно ввести */
  private _minCharacters: number = 0;

  /**
   * Получение минимального количества символов
   */
  public get minCharacters(): number {
    return this._minCharacters;
  }

  /**
   * Установка минимального количества символов с запуском валидации
   */
  public set minCharacters(value: number) {
    this._minCharacters = value;
    this._inputValidate.validateLengthValue(this.value, this);
  }

  /** Значение поля ввода */
  private _value: string = '';

  /**
   * Получения значения поля ввода
   */
  public get value(): string {
    return this._value;
  }

  /**
   * Задание значения с проверкой на длину и валидность
   * @param value значение поля ввода
   * @param replaceCharacter необходимость замена символов при работе регулярного выражения
   */
  public setValue(value: string, replaceCharacter: boolean): void {
    this._value = this._inputValidate.validateInputValue(value, this, replaceCharacter);
  }

  /**
   * Настройки для создания объекта ввода данных
   * @param size размер объекта
   * @param type тип выводимой рамки объекта
   * @param width ширина объекта
   * @param widthUnit единица измерения ширины
   * @param placeholder текст подсказки
   * @param value значение, если имеется
   * @param minCharacters минимально необходимое количество символов
   * @param maxCharacters максимально возможное количество символов
   * @param regularExpression регулярное выражения для выполнения валидации
   * @param regularExpressionExecute как будет применяться регулярное выражение
   * @param textAlign расположение текста относительное блока
   * @param iconUrl ссылка на иконку, которая будет выводиться в поле ввода
   * @param positionIconUrl позиция иконки относительно текста
   * @param isLoading указывает на отображение иконки загрузки данных в компоненте
   */
  public constructor(
    public size: string = TextInputSize.Medium,
    type: string = TextInputType.Normal,
    public width: number = 200,
    public widthUnit: TextInputUnit = TextInputUnit.Pixel,
    public placeholder: string = '',
    value: string = '',
    minCharacters = 0,
    public maxCharacters = 256,
    public regularExpression: RegExp | TextInputRegularExpression = TextInputRegularExpression.NotUse,
    public regularExpressionExecute: TextInputRegularExpressionExecute = TextInputRegularExpressionExecute.NotUse,
    public textAlign: TextInputTextAlign =  TextInputTextAlign.Left,
    public iconUrl: string | null = null,
    public positionIconUrl: TextInputIconPosition = TextInputIconPosition.NotDisplay,
    public isLoading: boolean = false
  ) {
    this.setType(type, false);
    this.setValue(value, true);
    this.minCharacters = minCharacters;
  }
}