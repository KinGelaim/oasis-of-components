import { ButtonExpandSize } from "./button-expand-size.enum";
import { ButtonExpandState } from "./button-expand-state.enum";
import { ButtonExpandUnit } from "./button-expand-unit.enum";

/**
 * Хранит настройки для кнопки
 */
export class ButtonExpandSettings {
  /* Ширина раздвигающейся кнопки в обычном состоянии, размер Small */
  public widthExpandButtonDefaultSmall: number = 32;

  /* Ширина раздвигающейся кнопки в обычном состоянии, размер Medium */
  public widthExpandButtonDefaultMiddle: number = 40;

  /* Ширина раздвигающейся кнопки в обычном состоянии, размер Large */
  public widthExpandButtonDefaultLarge: number = 48;

  /** Состояние кнопки */
  public state: ButtonExpandState = ButtonExpandState.Default;

  /** Основной цвет фона кнопки */
  public backgroundDefaultColor: string = "#5479ab";

  /** Основной цвет фона кнопки в выключенном состоянии */
  public backgroundDisabledColor: string = "#ebebeb";

  /**
   * Конструктор создания настроек для кнопки
   * @param isExpand раздвигается ли кнопка
   * @param textButton текст кнопки
   * @param size размер компонента
   * @param defaultIconUrl ссылка на стандартную иконку
   * @param disabledIconUrl ссылка на иконку для выключенного состояния
   * @param widthExpandButtonHover ширина раздвигающейся кнопки в наведенном состоянии
   * @param widthUnit единица измерения ширины
   */
  public constructor(
    public isExpand: boolean = true,
    public textButton: string = "Очистить",
    public size: ButtonExpandSize = ButtonExpandSize.Medium,
    public defaultIconUrl: string | null = null,
    public disabledIconUrl: string | null = null,
    public widthExpandButtonHover: number = 150,
    public widthUnit: ButtonExpandUnit = ButtonExpandUnit.Pixel
  ) { }
}