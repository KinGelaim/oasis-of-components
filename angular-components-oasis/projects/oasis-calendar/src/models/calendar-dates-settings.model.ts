/**
 * Настройки календаря для хранения списка дней
 * А также расцветки этих дней в календаре
 */
export abstract class CalendarDatesSettings {
  /** Список дат */
  public days: Date[] = [];

  /** Цвет отображения для заданных дат */
  public color: string = '';

  /** Цвет фона для заданных дат */
  public backgroundColor: string = '';
}