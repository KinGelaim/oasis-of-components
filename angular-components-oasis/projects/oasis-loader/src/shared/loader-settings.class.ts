import { LoaderColorBackground } from "./loader-color-background.enum";

/**
 * Класс для настройки загрузчика
 */
export class LoaderSettings {
  /**
   * Задаем параметры загрузчика
   * @param colorBackground цвет фона
   */
  public constructor(public colorBackground: LoaderColorBackground = LoaderColorBackground.Transparent) { }
}