/**
 * Класс для хранения месяца и числа меня выбранного в календаре
 */
export class ShortCalendarSendDate {
  /**
   * Конструктор создания даты для упрощенного календаря
   * @param month месяц
   * @param dayNumber число месяца
   */
  public constructor(
    public month: number | null,
    public dayNumber: number | null
  ) { }
}