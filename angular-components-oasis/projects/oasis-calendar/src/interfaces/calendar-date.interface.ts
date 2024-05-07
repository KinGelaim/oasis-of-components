/**
 * Интерфейс для хранения информации об одном объекте (дне, месяце, годе) таблицы модального окна календаря
 */
export interface CalendarDate {
  /** Значение */
  value: Date;

  /** Флаг отключения объекта */
  isDisabled: boolean;

  /** Цвет текста дня */
  colorTextDay: string;

  /** Цвет фона дня */
  backgroundColorTextDay: string;

  /** Цвет текста выбранного дня */
  selectedColorTextDay: string;

  /** Цвет фона для выбранного дня */
  selectedBackgroundColorTextDay: string;

  /** Флаг выбранного значения */
  isSelected: boolean;

  /** Флаг отображения, что дата входит в диапазон множественного выбора */
  isHoveredMulti: boolean;
}