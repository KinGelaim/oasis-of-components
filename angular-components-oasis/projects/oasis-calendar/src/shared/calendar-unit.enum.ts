/**
 * Основные типы данных для установки размера компонента
 */
export enum CalendarUnit {
  /** Не выбран тип */
  None = '',

  /** Пиксели */
  Pixel = 'px',

  /** Проценты */
  Percent = '%',

  /** Ширина экрана */
  ViewportWidth = 'vw',

  /** Высота экрана */
  ViewportHeight = 'vh'
}