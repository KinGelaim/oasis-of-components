/**
  * Основные единицы измерения размеров компонента
  */
export enum TimeInputUnit {
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