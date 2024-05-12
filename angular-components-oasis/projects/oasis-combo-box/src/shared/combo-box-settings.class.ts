import { ComboBoxSize } from './combo-box-size.enum';
import { IComboBoxItem } from './combo-box-item.interface';
import { ComboBoxItemSettings } from './combo-box-item-settings.class';
import { ComboBoxUnit } from './combo-box-unit.enum';
import { ComboBoxResultProcessing } from './combo-box-result-processing.enum';
import { ComboBoxSearchType } from './combo-box-search-type.enum';

/**
 * Хранит настройки для комбобокса
 */
export class ComboBoxSettings {
  /** Цвет текста по умолчанию ($color-dark-background) */
  public defaultFontColor: string = '#0e2648';

  /** Цвет фона по умолчанию */
  public defaultBackgroundColor: string = '#E8F2FF';

  /** Цвет текста */
  private _fontColor: string | null = null;

  /** Получение цвета текста */
  public get fontColor(): string {
    return this._fontColor ?? this.defaultFontColor;
  }

  /** Цвет текста */
  public set fontColor(value: string) {
    this._fontColor = value;
  }

  /** Цвет фона и цвет при наведении */
  private _backgroundColor: string | null = null;

  /** Получение цвета фона и цвет при наведении */
  public get backgroundColor(): string {
    return this._backgroundColor ?? this.defaultBackgroundColor;
  }

  /** Цвет фона и цвет при наведении */
  public set backgroundColor(value: string) {
    this._backgroundColor = value;
  }

  /** Цвет текста при выключенном состоянии, именно выбранного текста, не placeholder ($color-neutral-700) */
  public disabledFontColor: string = '#959595';

  /** Цвет фона для элементов списка по умолчанию ($color-white-background) */
  public defaultBackgroundColorItem: string = '#ffffff';

  /** Цвет поля ввода в выключенном состоянии ($color-neutral-100) */
  public disableBackgroundColor: string = '#ebebeb';

  /** Цвет выделенного объекта по умолчанию ($color-neutral-100) */
  public selectedBackgroundColorItem: string = '#ebebeb';

  /** Цвет текста для выключенного состояния строки ($color-neutral-500) */
  public disableFontColorItem: string = '#bdbdbd';

  /** Элемент выбрать все */
  public selectedAllElement: IComboBoxItem = {
    value: "selectedAll",
    display: "Выбрать все"
  };

  /** Список объектов для вывода */
  private _items: IComboBoxItem[] = [];

  /** Список объектов для вывода */
  public set items(items: IComboBoxItem[]) {
    this._items = items;

    // Для множественного выбора добавляем выбрать все
    if (this.isMultiSelectable) {
      this._items.unshift(this.selectedAllElement);
    }
  }

  /** Получение списка объектов для вывода */
  public get items(): IComboBoxItem[] {
    return this._items;
  }

  /**
   * Конструктор создания компонента
   * @param size размер
   * @param resultProcessing какие действия выполнять при неверном вводе и потере фокуса с поля
   * @param isAddedEmptyValue добавить ли пустое значение
   * @param isAlwaysDisplayEmptyValue всегда отображать пустое значение или только, когда есть выбранное значение
   * @param searchType тип поиска значения в списке элементов
   * @param placeholder подсказка
   * @param width ширина
   * @param widthUnit единица измерения ширины компонента
   * @param itemsSettings список настроек каждого компонента имеющего данные общие настройки
   * @param isNeedReverseOpening надо ли при необходимости открывать список вверх
   * @param isMultiSelectable возможность выбора нескольких значений
   */
  public constructor(
    public size: ComboBoxSize = ComboBoxSize.Medium,
    public resultProcessing: ComboBoxResultProcessing = ComboBoxResultProcessing.None,
    public isAddedEmptyValue: boolean = false,
    public isAlwaysDisplayEmptyValue: boolean = false,
    public searchType: ComboBoxSearchType = ComboBoxSearchType.Include,
    public placeholder: string = 'Введите или выберите из списка',
    public width: number = 300,
    public widthUnit: ComboBoxUnit = ComboBoxUnit.Pixel,
    public itemsSettings: ComboBoxItemSettings[] = [],
    public isNeedReverseOpening: boolean = false,
    public isMultiSelectable: boolean = false
  ) { }
}