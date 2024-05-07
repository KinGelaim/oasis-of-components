import { ButtonIconPosition } from "./button-icon-position.enum";
import { ButtonSize } from "./button-size.enum";
import { ButtonState } from "./button-state.enum";
import { ButtonType } from "./button-type.enum";
import { ButtonUnit } from "./button-unit.enum";

/**
 * Хранит настройки для кнопки
 */
export class ButtonSettings {
  /** Основной белый цвет */
  public whiteColor: string = "#fff";

  /** Прозрачный цвет */
  public transparentColor: string = "transparent";

  /** Основной цвет фона кнопки */
  public backgroundDefaultColor: string = "#5479AB";

  /** Основной цвет фона кнопки при наведении */
  public backgroundHoverColor: string = "#1B4C8F";

  /** Основной цвет фона кнопки при нажатии */
  public backgroundClickColor: string = "#0E2648";

  /** Основной цвет фона кнопки в выключенном состоянии */
  public backgroundDisabledColor: string = "#D4D4D4";

  /**
   * Конструктор создания настроек для кнопки
   * @param textButton текст кнопки
   * @param size размер кнопки
   * @param width ширина компонента
   * @param widthUnit единица измерения ширины
   * @param type тип кнопки
   * @param state состояние кнопки
   * @param defaultIconUrl ссылка на стандартную иконку
   * @param hoverIconUrl ссылка на иконку для наведения
   * @param clickIconUrl ссылка на иконку для клика
   * @param disabledIconUrl ссылка на иконку для выключенного состояния
   * @param positionIconUrl положение иконки относительно текста
   */
  public constructor(
    public textButton: string = "Очистить",
    public size: ButtonSize = ButtonSize.Medium,
    public width: number = 120,
    public widthUnit: ButtonUnit = ButtonUnit.None,
    public type: ButtonType = ButtonType.Main,
    public state: ButtonState = ButtonState.Default,
    public defaultIconUrl: string | null = null,
    public hoverIconUrl: string | null = null,
    public clickIconUrl: string | null = null,
    public disabledIconUrl: string | null = null,
    public positionIconUrl: ButtonIconPosition = ButtonIconPosition.NotDisplay
  ) { }
}