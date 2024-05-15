import { ShortCalendarMonth } from "../models/short-calendar-month.model";

/**
 * Интерфейс для хранения дат
 */
export interface ShortCalendarDates {
  /** Первый месяц (единичная или первая дата) */
  firstMonth: ShortCalendarMonth | null;

  /** Номер дня (единичная или первая дата) */
  firstDayNumber: number | null;

  /** Второй месяц (вторая дата) */
  secondMonth: ShortCalendarMonth | null;

  /** Номер дня (вторая дата) */
  secondDayNumber: number | null;
}
