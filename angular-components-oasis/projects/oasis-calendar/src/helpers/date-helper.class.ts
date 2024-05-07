/**
 * Вспомогательный класс для работы с датами
 */
export class DateHelper {
  /** Количество миллисекунд в дне */
  public static readonly MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

  /** Количество дней в недели */
  private static readonly DAYS_PER_WEEK = 7;  

  /**
   * Метод проверяет объекты Date по дате (не учитывая время) на равенство
   */
  public static comparingDatesWithoutTime(firstDate: Date, secondDate: Date): boolean {
    return firstDate.getDate() == secondDate.getDate() &&
      firstDate.getMonth() == secondDate.getMonth() &&
      firstDate.getFullYear() == secondDate.getFullYear();
  }

  /**
   * Копирование даты без времени
   */
  public static CopyDateWithoutTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /**
   * Метод для получения первого дня месяца заданной даты
   */
  public static GetFirstDayOfMonth(date: Date): Date {
    let firstDay = this.CopyDateWithoutTime(date);
    firstDay.setDate(1);
    return firstDay;
  }

  /**
   * Метод для получения последнего дня месяца заданной даты
   */
  public static GetLastDayOfMonth(date: Date): Date {
    let lastDay = this.CopyDateWithoutTime(date);
    // Сначала ставим первое число, чтобы не проскочить следующий месяц, если там нет такой даты (например, 31)
    lastDay.setDate(1);
    lastDay.setMonth(date.getMonth() + 1);
    lastDay.setDate(0);
    return lastDay;
  }

  /**
   * Получает первый день недели относительно заданной даты
   */
  public static GetFirstDayOfWeek(date: Date) {
    let refDate = new Date(date);
    let offsetDays = date.getDay() == 0 ? -6 : 1;
    return new Date(refDate.setDate(date.getDate() - date.getDay() + offsetDays));
  }

  /**
   * Возвращает дату следующего дня недели, относительно заданной даты
   * @param date заданная дата
   * @param weekDay искомый день недели, где 0 - вск, 1 - понедельник и т.д.
   */
  public static GetLastDayOfWeek(date: Date, weekDay: number) {
    let refDate = new Date(date);
    return new Date(refDate.setDate(date.getDate() - date.getDay() + this.DAYS_PER_WEEK + weekDay));
  }
}