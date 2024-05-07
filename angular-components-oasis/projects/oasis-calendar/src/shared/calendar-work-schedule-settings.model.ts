/**
 * Класс для настроек календаря при работе по графику
 */
export class CalendarWorkScheduleSettings {
  /** Количество дней в рабочем цикле */
  private _workingCycleDays!: number;

  /** Получить количество дней в рабочем цикле */
  public get workingCycleDays(): number{
    return this._workingCycleDays;
  }

  /** Установить количество дней в рабочем цикле */
  public set workingCycleDays(value: number) {
    if (value <= 0) {
      value = 1;
    }

    this._workingCycleDays = value;
  }

  /**
   * Конструктор с настройками для календаря по графику работы
   * @param startDateWorkSchedule Стартовая дата для календаря
   * @param workingCycleDays Количество дней в рабочем цикле (например, один рабочий день, два выходных - три дня цикла)
   */
  public constructor(
    public startDateWorkSchedule: Date,
    workingCycleDays: number
  ) {
    this.workingCycleDays = workingCycleDays;
  }
}