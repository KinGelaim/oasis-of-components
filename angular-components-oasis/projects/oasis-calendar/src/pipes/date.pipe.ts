import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Пайп для преобразования даты в нужный формат
 * Использует стандартный пайп ангуляра для преобразования всего, кроме месяцев
 */
@Pipe({
  name: 'date'
})
export class AppDatePipe implements PipeTransform {
  /** Список месяцев */
  private readonly ALL_MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  public constructor(private datePipe: DatePipe) { }

  public transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
  public transform(value: Date | null | undefined, format?: string, timezone?: string, locale?: string): null;
  public transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string): string | null {
    if (value != null && format == 'MMMM') {
      return this.getMonthName(new Date(value).getMonth());
    }

    return this.datePipe.transform(value, format, timezone, locale);
  }

  /**
   * Получение наименования месяца в им. падеже по номеру месяца
   */
  private getMonthName(monthNumber: number): string {
    if (monthNumber < 0 || monthNumber > this.ALL_MONTHS.length) {
      return '';
    }

    return this.ALL_MONTHS[monthNumber];
  }
}