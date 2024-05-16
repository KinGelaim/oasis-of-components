import { TimeInputType } from "./time-input-type.enum";
import { TimeInputUnit } from "./time-input-unit.enum";
import { TimeInputVisualType } from "./time-input-visual-type.enum";

/**
 * Хранит настройки для временного поля
 */
export class TimeInputSettings {
  /** Цвет фона для компонента */
  public backgroundColor: string = '#E8F2FF';

  /** Цвет обводки для компонента при наведении и фокусе */
  public borderColor: string = '#5479AB';

  /** Цвет шрифта в компоненте */
  public fontColor: string = '#0E2648';

  /** Цвет текста при отключении */
  public disableFontColor: string = '#BDBDBD';

  /** Цвет фона при отключении */
  public disableBackgroundColor: string = '#EBEBEB';

  /** Цвет обводки при отключении */
  public disableBorderColor: string = '#EBEBEB';

  /** Цвет ошибки */
  public errorColor: string = '#C51620';

  /** Максимальная количество часов для валидации компонента */
  private _maxHours: number = 23;

  /** Максимальное количество минут для валидации компонента */
  private _maxMinutes: number = 59;

  /** Минимальное количество часов для валидации компонента */
  private _minHours: number = 0;

  /** Минимальное количество минут для валидации компонента */
  private _minMinutes: number = 0;

  /** Количество часов в компоненте */
  private _hours: number | null = null;

  /** Количество минут в компоненте */
  private _minutes: number | null = null;

  /** Максимальная длина часов или минут */
  private readonly MAX_LENGTH: number = 2;

  /** Количество часов в дне */
  private readonly HOURS_IN_DAY: number = 24;

  /** Количество минут в часе */
  private readonly MINUTES_IN_HOUR: number = 60;

  /**
   * Конструктор настроек для компонента "Временное поле"
   * @param value значение в поле компонента
   * @param type тип компонента
   * @param width ширина компонента
   * @param widthUnit единица измерения ширины компонента
   * @param visualType внешний вид компонента
   * @param fontSize размер шрифта в пикселях
   */
  public constructor(
    public value: string = '',
    public type: TimeInputType = TimeInputType.Normal,
    public width: number = 125,
    public widthUnit: TimeInputUnit = TimeInputUnit.Pixel,
    public visualType: TimeInputVisualType = TimeInputVisualType.TableCell,
    public fontSize: number = 14
  ) {
    if (value != '') {
      this.setValue(value);
    }
  }

  /**
   * Установить значение в компонент
   * @param newValue новое значение
   */
  public setValue(newValue: string): void {
    let result = '';

    const splitValue = newValue.split(':');

    for (let i = 0; i < splitValue.length; i++) {
      splitValue[i] = splitValue[i].replace(/[^0-9\:]+/g, '').trim();
    }

    if (splitValue.length == 1) {
      if (splitValue[0].length <= 1) {
        result = splitValue[0];
      }

      if (splitValue[0].length == this.MAX_LENGTH) {
        result = splitValue[0] + ' : ';
      }

      if (splitValue[0].length > this.MAX_LENGTH) {
        result = splitValue[0].substring(0, this.MAX_LENGTH) + ' : ' + splitValue[0].substring(this.MAX_LENGTH, splitValue[0].length);
      }
    }

    if (splitValue.length == this.MAX_LENGTH) {
      if (splitValue[0].length > this.MAX_LENGTH) {
        result = splitValue[0].substring(0, this.MAX_LENGTH) + ' : ' + splitValue[0].substring(this.MAX_LENGTH, splitValue[0].length) + splitValue[1];
      } else if (splitValue[1].length > this.MAX_LENGTH) {
        result = splitValue[0] + splitValue[1].substring(0, splitValue[1].length - this.MAX_LENGTH) + ' : ' + splitValue[1].substring(splitValue[1].length - this.MAX_LENGTH, splitValue[1].length);
      } else {
        if (splitValue[0] == '') {
          result = splitValue[1];
        } else if (splitValue[1] == '') {
          result = splitValue[0];
        } else {
          result = splitValue[0] + ' : ' + splitValue[1];
        }
      }
    }

    // Ещё раз разделяем, чтобы отсеять лишние минуты (если пользователь вводил значение через выделение поля)
    const splitResult = result.split(':');

    for (let i = 0; i < splitResult.length; i++) {
      splitResult[i] = splitResult[i].trim();
    }

    if (splitResult.length == this.MAX_LENGTH) {
      let leftPart = splitResult[0];
      let rightPart = splitResult[1];

      if (splitResult[0].length > this.MAX_LENGTH) {
        leftPart = splitResult[0].substring(0, this.MAX_LENGTH);
      }

      if (splitResult[1].length > this.MAX_LENGTH) {
        rightPart = splitResult[1].substring(0, this.MAX_LENGTH);
      }

      result = leftPart + ' : ' + rightPart;
    }

    this.value = result.replace(/\s+/g, " ");

    this.validateValue();
  }

  /**
   * Валидация текущего значения
   */
  private validateValue(): void {
    if (this.type == TimeInputType.Disable) {
      return;
    }

    this.type = TimeInputType.Normal;
    this._hours = null;
    this._minutes = null;

    const split = this.value.split(':');

    if (split.length != this.MAX_LENGTH) {
      this.type = TimeInputType.Error;
      return;
    }

    // Часы
    const leftPart = Number(split[0]);
    if (split[0] == ''
        || split[0] == ' '
        || isNaN(leftPart)
        || leftPart > this._maxHours
        || leftPart < this._minHours
        || leftPart >= this.HOURS_IN_DAY) {
      this.type = TimeInputType.Error;
    }

    if (leftPart < this.HOURS_IN_DAY) {
      this._hours = leftPart;
    }

    // Минуты
    const rightPart = Number(split[1]);
    if (split[1] == ''
        || split[1] == ' '
        || split[1].trim().length != this.MAX_LENGTH
        || isNaN(rightPart)
        || leftPart == this._maxHours && rightPart > this._maxMinutes
        || leftPart == this._minHours && rightPart < this._minMinutes
        || rightPart >= this.MINUTES_IN_HOUR) {
      this.type = TimeInputType.Error;
    }

    if (rightPart < this.MINUTES_IN_HOUR) {
      this._minutes = rightPart;
    }
  }

  /**
   * Получить текущее значение
   * @returns возвращает кортеж из значений, если они прошли валидацию (например, если часы не прошли валидацию, а минуты ок, то вернётся [null, N])
   */
  public getValue(): [number | null, number | null] {
    return [this._hours, this._minutes];
  }

  /**
   * Установить максимальное границу для валидации компонента
   * @param maxHours максимальное количество часов
   * @param maxMinutes максимальное количество часов
   */
  public setMaxValue(maxHours: number, maxMinutes: number) {
    this._maxHours = maxHours;
    this._maxMinutes = maxMinutes;
    this.validateValue();
  }

  /**
   * Установить минимальную границу для валидации компонента
   * @param minHours минимальное количество часов
   * @param minMinutes минимальное количество минут
   */
  public setMinValue(minHours: number, minMinutes: number) {
    this._minHours = minHours;
    this._minMinutes = minMinutes;
    this.validateValue();
  }
}