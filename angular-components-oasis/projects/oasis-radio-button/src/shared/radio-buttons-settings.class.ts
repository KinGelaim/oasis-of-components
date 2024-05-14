import { EventEmitter } from '@angular/core';

import { RadioButtonSettingItem } from './radio-button-setting-item.class';
import { RadioButtonType } from './radio-button-type.enum';
import { RadioButtonPosition } from './radio-button-position.enum';
import { RadioButtonSize } from './radio-button-size.enum';

/**
 * Хранит настройки для радиокнопки
 */
export class RadioButtonsSettings {
  /** Эмиттер, получающий выбранное значение в списке радиокнопок */
  public selectedValue: EventEmitter<RadioButtonSettingItem>;

  /**
   * Конструктор для создания радиокнопки
   * @param name наименование группы
   * @param size размер радиокнопки
   * @param position местоположение радиокнопки
   * @param type тип радиокнопки
   * @param items список объектов группы
   */
  public constructor(
    public name: string,
    public size: RadioButtonSize = RadioButtonSize.Medium,
    public position: RadioButtonPosition = RadioButtonPosition.Left,
    public type: RadioButtonType = RadioButtonType.Normal,
    public items: RadioButtonSettingItem[] = []
  ) {
    this.selectedValue = new EventEmitter<RadioButtonSettingItem>();
  }

  /**
   * Сброс всех выбранных значений
   */
  public resetSelectedItem(): void{
    this.items.forEach(item => {
      item.checkedState = false;
    });
  }
}