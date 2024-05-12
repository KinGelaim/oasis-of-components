/**
 * Типы для поля ввода
 */
export enum DigitInputType {
  /** Нейтральное */
  Normal = 'normal',

  /** Ошибка */
  Error = 'error',

  /**
   * Предупреждение
   * Есть только у ячейки таблицы
   */
  Warning = 'warning',

  /**
   * Выключенное
   * Есть только у ячейки таблицы
   */
  Disable = 'disable'
}