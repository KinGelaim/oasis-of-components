/**
 * Основные цвета заднего фона
 */
export enum LoaderColorBackground {
  /** Прозрачный, видно все */
  Transparent = 1,

  /** Размытый, видно все, но есть размытие заднего фона */
  Blur = 2,

  /** Затемненный, видно все, но с затемнением */
  Shaded = 3,

  /** Белый фон, скрывает все */
  White = 4,
}

/** Соответствие enum и цветов заднего фона */
export const ColorBackgroundLabel = new Map<number, string>([
  [LoaderColorBackground.Transparent, 'none'],
  [LoaderColorBackground.Blur, 'none'],
  [LoaderColorBackground.Shaded, 'rgba(0, 0, 0, 0.4)'],
  [LoaderColorBackground.White, 'rgb(255, 255, 255)']
]);