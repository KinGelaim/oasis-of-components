import { EventEmitter } from '@angular/core';

import { IDropDownItem } from './drop-down-item.interface';

/**
 * Класс для работы с отдельными объектами компонента
 */
export class DropDownItemSettings {
  /** Эмиттер для установки значения внутри компонента */
  public selectedValue: EventEmitter<IDropDownItem>;

  /** Эмиттер смены включения и выключения компонента */
  public changeDisabled: EventEmitter<IDropDownItem>;

  /** Эмиттер для сброса выбранных значений в компоненте */
  public clearSelectedValues: EventEmitter<boolean>;

  /** Эмиттер для сброса выбранных значений в компоненте с возвращаемым значением о сбросе */
  public clearSelectedValuesWithEmit: EventEmitter<boolean>;

  /** Выключенное ли состояние компонента */
  private _isDisabled: boolean = false;

  /** Получение состояния компонента (выключено или нет) */
  public get isDisabled(): boolean {
    return this._isDisabled;
  }

  /** Установка состояния компонента (выключено или нет) */
  public set isDisabled(value: boolean) {
    this._isDisabled = value;
    this.changeDisabled.emit();
  }

  /**
   * Конструктор создания настроек для конкретного выпадающего списка
   * @param isDisabled выключенное ли состояние
   * @param selectedItems выбранные объекты
   * @param isNeedReverseEmit нужен ли обратный вызов после изменения значения в компоненте через EventEmitter
   * @param isNeedRepeatedSelectionEmit нужно ли отправлять повторный выбор элемента, который уже выбран (действует только в одиночном выпадающем списке)
   */
  public constructor(
    isDisabled: boolean = false,
    public selectedItems: IDropDownItem[] = [],
    public isNeedReverseEmit: boolean = false,
    public isNeedRepeatedSelectionEmit: boolean = false
  ) {
    this._isDisabled = isDisabled;

    this.selectedValue = new EventEmitter<IDropDownItem>();
    this.changeDisabled = new EventEmitter<IDropDownItem>();
    this.clearSelectedValues = new EventEmitter<boolean>();
    this.clearSelectedValuesWithEmit = new EventEmitter<boolean>();
  }
}
