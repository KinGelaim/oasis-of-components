/**
 * Указывает на визуальный тип поля ввода
 */
export enum DigitInputVisualType {
  /** Вид без кнопок */
  ButtonsNotDisplay = 'buttons-not-display',

  /** Вид с кнопками с обеих сторон */
  ButtonsBothSide = 'buttons-both-side',

  /** Вид с кнопками справа */
  ButtonsRightSide = 'buttons-right-side',

  /** Вид ячейки таблицы */
  TableCell = 'table-cell'
}