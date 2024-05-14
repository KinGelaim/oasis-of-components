/**
 * Место расположения треугольника, относительно подсказки
 */
export enum HintBoxTrianglePlace {
  /** Скрытое */
  Hidden = 'hidden',

  /** Сверху */
  Top = 'top',

  /** Снизу */
  Bottom = 'bottom',

  /** Слева */
  Left = 'left',

  /** Справа */
  Right = 'right',
  
  /** Снизу слева */
  BottomLeft = 'bottom-left',

  /** Снизу справа */
  BottomRight = 'bottom-right',

  /** Сверху слева */
  TopLeft = 'top-left',

  /** Сверху справа */
  TopRight = 'top-right'
}