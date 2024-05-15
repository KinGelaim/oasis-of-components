/**
 * Интерфейс для хранения состояния дня
 */
export interface ShortCalendarDay {
  /** Номер дня */
  dayNumber: number;

  /** Выключен ли день */
  isDisabled: boolean;

  /** Виден ли день */
  isVisible: boolean;
}