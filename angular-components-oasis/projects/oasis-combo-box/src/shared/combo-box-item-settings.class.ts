import { EventEmitter } from '@angular/core';

import { IComboBoxItem } from './combo-box-item.interface';
import { ComboBoxType } from './combo-box-type.enum';

/**
 * Класс для работы с отдельными объектами компонента
 */
export class ComboBoxItemSettings {
  /** Эмиттер для установки значения внутри компонента */
  public selectedValue: EventEmitter<IComboBoxItem>;

  /** Эмиттер для сброса выбранных значений в компоненте */
  public clearSelectedValuesWithoutEmit: EventEmitter<boolean>;

  /** Эмиттер для сброса выбранных значений в компоненте с возвращаемым значением о сбросе */
  public clearSelectedValuesWithEmit: EventEmitter<boolean>;

  /**
   * Конструктор создания отдельных настроек для элемента
   * @param type тип текущего элемента
   * @param selectedItems выбранные объекты у текущего элемента
   * @param fontColor цвет текста для компонента
   * @param isBold жирным ли писать текст
   * @param isNeedReverseEmit нужен ли обратный вызов об изменении значения после установки из вне компонента
   * @param isNeedRepeatedSelectionEmit нужно ли отправлять повторный выбор элемента, который уже выбран
   */
  public constructor(
    public type: ComboBoxType = ComboBoxType.Normal,
    public selectedItems: IComboBoxItem[] = [],
    public fontColor: string | null = null,
    public isBold: string | null = null,
    public isNeedReverseEmit: boolean = false,
    public isNeedRepeatedSelectionEmit: boolean = false
  ) {
    this.selectedValue = new EventEmitter<IComboBoxItem>();
    this.clearSelectedValuesWithoutEmit = new EventEmitter<boolean>();
    this.clearSelectedValuesWithEmit = new EventEmitter<boolean>();
  }
}