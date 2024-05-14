import { HintBoxColor } from './hint-box-color.enum';
import { HintBoxTextAlignment } from './hint-box-text-alignment.enum';
import { HintBoxTrianglePlace } from './hint-box-triangle-place.enum';
import { HintBoxUnit } from './hint-box-unit.enum';

/**
 * Хранит настройки для всплывающей подсказки
 */
export class HintBoxSettings {
  /**
   * Настройки для создания всплывающей подсказки
   * @param color цвет всплывающей подсказки
   * @param trianglePlace расположение треугольника относительно блока с текстом
   * @param text текст, который будет в подсказке
   * @param textAlignment способ выравнивания текста внутри подсказки
   * @param maxWidth максимальная ширина подсказки, иначе перенос слов
   * @param maxWidthUnit единица измерения максимальной ширины подсказки
   * @param minWidth минимальная ширина подсказки
   * @param minWidthUnit единица измерения минимальной ширины подсказки
   */
  public constructor(
    public color: HintBoxColor = HintBoxColor.Light,
    public trianglePlace: HintBoxTrianglePlace = HintBoxTrianglePlace.Bottom,
    public text: string = '',
    public textAlignment: HintBoxTextAlignment = HintBoxTextAlignment.Center,
    public maxWidth: number = 70,
    public maxWidthUnit: HintBoxUnit = HintBoxUnit.Pixel,
    public minWidth: number = 50,
    public minWidthUnit: HintBoxUnit = HintBoxUnit.Pixel
  ) { }
}