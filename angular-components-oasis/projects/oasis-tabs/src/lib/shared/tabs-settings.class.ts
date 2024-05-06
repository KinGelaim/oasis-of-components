import { EventEmitter } from '@angular/core';

import { ITabsItemSelectable } from './tabs-item-selectable.interface'
import { TabsUnit } from './tabs-unit.enum';

/**
 * Хранит настройки для вкладок
 */
export class TabsSettings {
  /** Колбэк нажатия вкладки для получения значения */
  public onTabSelect: EventEmitter<ITabsItemSelectable>;

  /** Колбэк вызова нажатия вкладки для управления значением вне компонента */
  public onSetTabSelect: EventEmitter<[ITabsItemSelectable, boolean, boolean]>;

  /**
   * Конструктор создания настроек для компонента Вкладки
   * @param gap расстояние между вкладками (образует войд зону)
   * @param width ширина компонента
   * @param widthUnit единица измерения ширины
   * @param isNeedRepeatedSelectionEmit нужно ли отправлять повторный выбор элемента, который уже выбран (не распространяется на иконки)
   */
  public constructor(
    public gap: number = 40,
    public width: number | null = null,
    public widthUnit: TabsUnit = TabsUnit.None,
    public isNeedRepeatedSelectionEmit: boolean = false
  ) {
    this.onTabSelect = new EventEmitter<ITabsItemSelectable>();
    this.onSetTabSelect = new EventEmitter<[ITabsItemSelectable, boolean, boolean]>();
  }
}