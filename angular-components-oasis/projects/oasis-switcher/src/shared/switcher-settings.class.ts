import { EventEmitter } from '@angular/core';

import { SwitcherItem } from './switcher-item.class';
import { SwitcherSize } from './switcher-size.enum';
import { SwitcherUnit } from './switcher-unit.enum';

/**
 * Хранит основные настройки для переключателя
 */
export class SwitcherSettings {
  /** Объект, хранящий ссылки на выбранные объекты */
  public selectedValue: EventEmitter<any>;

  /**
   * Создание настроек переключателя
   * @param values список объектов, который будет выводиться
   * @param width ширина всего переключателя
   * @param widthUnit единица измерения ширины
   * @param size размер всего переключателя
   * @param isNeedRepeatedSelectionEmit нужно ли отправлять повторный выбор элемента, который уже выбран
   */
  public constructor(
    public values: SwitcherItem[] = [],
    public width: number = 100,
    public widthUnit: SwitcherUnit = SwitcherUnit.Pixel,
    public size: string = SwitcherSize.Medium,
    public isNeedRepeatedSelectionEmit: boolean = false
  ) {
    this.selectedValue = new EventEmitter<any>();
  }
}