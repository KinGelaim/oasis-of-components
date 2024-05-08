import { CheckBoxType } from './check-box-type.enum';
import { CheckBoxPosition } from './check-box-position.enum';
import { CheckBoxSize } from './check-box-size.enum';

/**
 * Хранит настройки для чекбокса
 */
export class CheckBoxSettings {
  /** Наличие текста, рядом с чекбоксом */
  public isThereLabel: boolean = true;

  /** Текст, который отображается рядом с чекбоксом */
  private _label: string = '';

  /**
   * Получаем значение текста, который рядом с чекбоксом
   */
  public get label(): string {
    return this._label;
  }

  /**
   * Задаем значение тексту, рядом с чекбоксом
   */
  public set label(value: string) {
    this._label = value;
    this.isThereLabel = this._label.length != 0;
  }

  /**
  * Конструктор для создания чекбокса
  * @param label текст, который отображается рядом с чекбоксом
  * @param size размер чекбокса
  * @param position местоположение чекбокса
  * @param type тип чекбокса
  * @param checkedState текущее значение чекбокса
  */
  public constructor(
    label: string = '',
    public size: CheckBoxSize = CheckBoxSize.Medium,
    public position: CheckBoxPosition = CheckBoxPosition.Left,
    public type: CheckBoxType = CheckBoxType.Normal,
    public checkedState: boolean = false
  ) {
    this.label = label;
  }
}