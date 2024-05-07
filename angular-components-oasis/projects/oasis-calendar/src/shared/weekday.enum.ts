/**
 * Флаговое представление дней недели
 */
export enum Weekday {
  /** Не выбран день недели */
  None = 0,

  /** Понедельник */
  Monday = 1 << 0,

  /** Вторник */
  Tuesday = 1 << 1,

  /** Среда */
  Wednesday = 1 << 2,

  /** Четверг */
  Thursday = 1 << 3,

  /** Пятница */
  Friday = 1 << 4,

  /** Суббота */
  Saturday = 1 << 5,

  /** Воскресенье */
  Sunday = 1 << 6
}

/**
 * Сопоставление объекта из перечисления и порядкового номера недели в библиотеки Date
 */
export const WeekdayDate = new Map<number, number>([
  [Weekday.Monday, 1],
  [Weekday.Tuesday, 2],
  [Weekday.Wednesday, 3],
  [Weekday.Thursday, 4],
  [Weekday.Friday, 5],
  [Weekday.Saturday, 6],
  [Weekday.Sunday, 0],
]);