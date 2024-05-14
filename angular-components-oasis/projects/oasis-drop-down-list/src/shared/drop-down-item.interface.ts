/**
 * Интерфейс для работы с элементами списка
 */
export interface IDropDownItem {
  /** Значение объекта */
  value: any;

  /** Отображаемое значение объекта */
  display: string;

  /**
   * Отключен
   * Объект заблокирован и с ним нельзя взаимодействовать
   */
  disabled?: boolean;

  /** Цвет заднего фона элемента */
  backgroundColor?: string;
}
