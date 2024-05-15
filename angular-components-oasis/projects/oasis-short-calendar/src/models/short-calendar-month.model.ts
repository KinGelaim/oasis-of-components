/**
 * Класс для хранения данных по месяцу
 */
export class ShortCalendarMonth {
  /**
   * Конструктор создания объекта для хранения месяца
   * @param number номер месяца в дате (от 0 до 11)
   * @param name наименование месяца на русском
   * @param nameGenitive наименование месяца в Родительном падеже
   * @param countDays максимальное количество дней в месяце (используется из-за февраля)
   */
  public constructor(
    public number: number,
    public name: string,
    public nameGenitive: string,
    public countDays: number,
  ) { }
}