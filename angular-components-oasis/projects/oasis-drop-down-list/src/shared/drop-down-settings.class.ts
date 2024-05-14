import { EventEmitter } from '@angular/core';

import { DropDownItemSettings } from './drop-down-item-settings.class';
import { IDropDownItem } from './drop-down-item.interface';
import { DropDownSize } from './drop-down-size.enum';
import { DropDownUnit } from './drop-down-unit.enum';

/**
 * Хранит настройки для выпадающего списка
 */
export class DropDownSettings {
  /** Цвет текста по умолчанию ($color-dark-background) */
  public defaultFontColor: string = '#0e2648';

  /** Цвет текста при выключенном состоянии, именно выбранного текста, не placeholder ($color-neutral-700) */
  public disabledFontColor: string = '#959595';

  /** Цвет текста для выключенного состояния строки ($color-neutral-500) */
  public disableFontColorItem: string = '#bdbdbd';

  /** Цвет текста для placeholder ($color-neutral-500) */
  public fontColorPlaceHolder: string = '#bdbdbd';

  /** Цвет фона для элементов списка по умолчанию ($color-white-background) */
  public defaultBackgroundColorItem: string = '#ffffff';

  /** Цвет поля ввода в выключенном состоянии ($color-neutral-100) */
  public disableBackgroundColor: string = '#ebebeb';

  /** Цвет выделенного объекта по умолчанию ($color-neutral-100) */
  public selectedBackgroundColorItem: string = '#ebebeb';

  /** Эмиттер для выключения элементов в списке */
  public disabledElement: EventEmitter<IDropDownItem>;

  /** Элемент выбрать все */
  public selectedAllElement: IDropDownItem = {
    value: "selectedAll",
    display: "Выбрать все"
  };

  /** Список объектов для вывода */
  private _items: IDropDownItem[] = [];

  /** Список объектов для вывода */
  public set items(items: IDropDownItem[]) {
    this._items = items;

    // Для множественного выбора добавляем выбрать все
    if (this.isMultiSelectable) {
      this._items.unshift(this.selectedAllElement);
    }
  }

  /** Список объектов для вывода */
  public get items(): IDropDownItem[] {
    return this._items;
  }

  /**
   * Конструктор создания выпадающего списка
   * @param size размер выпадающего списка
   * @param width ширина выпадающего списка
   * @param typeWidth единица измерения ширины
   * @param placeholder текст с наименованием выбранного элемента или исходный текст действия
   * @param fontColor цвет текста
   * @param backgroundColor цвет фона и цвет при наведении
   * @param isMultiSelectable возможность выбора нескольких значений
   * @param items список объектов для вывода
   * @param itemsSettings список настроек каждого компонента имеющего данные общие настройки
   */
  constructor(
    public size: DropDownSize = DropDownSize.Medium,
    public width: number = 300,
    public widthUnit: DropDownUnit = DropDownUnit.Pixel,
    public placeholder: string = 'Выберите контент',
    public fontColor: string = '#0E2648',
    public backgroundColor: string = '#E8F2FF',
    public isMultiSelectable: boolean = false,
    public itemsSettings: DropDownItemSettings[] = []
  ) {
    this.disabledElement = new EventEmitter<IDropDownItem>();
  }
}