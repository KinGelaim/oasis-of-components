import { CalendarDatesSettings } from "../models/calendar-dates-settings.model";

/**
 * Класс для хранения дат, которые можно выбрать в календаре
 * Используется при выборе типа календаря - список дат (CalendarType.selectedDays)
 * Или для выделения конкретных дат цветом в обычном календаре
 */
export class CalendarSelectedDatesSettings extends CalendarDatesSettings {
  /** Цвет отображения для заданных дат при выделении ячейки */
  public selectedColor: string = '';

  /** Цвет отображения фона для заданных дат при выделении ячейки */
  public selectedBackgroundColor: string = '';
}