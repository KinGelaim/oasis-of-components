import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ShortCalendarDates } from './interfaces/short-calendar-dates.interface';
import { PeriodType } from './models/period-type.enum';
import { ShortCalendarMonth } from './models/short-calendar-month.model';
import { ShortCalendarSendDate } from './shared/short-calendar-send-date.model';
import { ShortCalendarSettings } from './shared/short-calendar-settings.model';
import { ShortCalendarUnit } from './shared/short-calendar-unit.enum';
import { ShortCalendarDate } from './shared/short-calendar-date.interface';
import { ShortCalendarDay } from './interfaces/short-calendar-day.interface';

// TODO: убрать CommonModule
// TODO: вынести иконку как в основном календаре
@Component({
  selector: 'oasis-short-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'oasis-short-calendar.component.html',
  styleUrl: 'oasis-short-calendar.component.scss'
})
export class OasisShortCalendarComponent implements OnInit, OnDestroy {
  /** Ссылка на элемент модального окна календаря для отслеживания нажатий мыши */
  @ViewChild('calendarModal')
  private calendarModal!: ElementRef;

  /** Основные настройки календаря */
  @Input()
  public shortCalendarSettings!: ShortCalendarSettings;

  /** Алиас на ширину календаря */
  public ShortCalendarWidth = ShortCalendarUnit;

  /** Алиас на тип периода */
  public PeriodType = PeriodType;

  /** Отвечает за открытие/закрытие обложки при открытом календаре */
  public closableCoverActive: boolean = false;

  /** Текущий период выбора даты (месяц или день) */
  public currentPeriod: PeriodType = PeriodType.Month;

  /** Весь список дней по неделям */
  public allDays: ShortCalendarDay[][] = this.setDays();

  /** Открытие модального окна календаря */
  public isOpenedModal: boolean = false;

  /** Старое выбранное значение календаря */
  public oldSelectedDate: ShortCalendarDates = this.setDefaultValue();

  /** Заблокирована ли кнопка сегодня */
  public isTodayDisabled: boolean = false;

  /** Сортировка в сторону возрастания */
  private isIncreaseSort: boolean = true;

  /** Ссылка на метод для отслеживание нажатий кнопки мыши */
  private mouseListener = this.calendarMouseListener.bind(this);

  /** Подписка для очистки даты */
  private subscriptionOnClearDate: Subscription | null = null;

  /** Подписка на установку даты с обратным вызовом */
  private subscriptionOnSetDateWithEmit: Subscription | null = null;

  /** Подписка на установку даты без обратного вызова */
  private subscriptionOnSetDateWithoutEmit: Subscription | null = null;

  /** Подписка на установку дат с обратным вызовом */
  private subscriptionOnSetDatesWithEmit: Subscription | null = null;

  /** Подписка на установку дат без обратного вызова */
  private subscriptionOnSetDatesWithoutEmit: Subscription | null = null;

  public ngOnInit(): void {
    this.shortCalendarSettings.selectedDates = this.setDefaultValue();
    this.subscriptionOnClearDate = this.shortCalendarSettings.callbackClearDate.subscribe(this.clearDate.bind(this));
    this.subscriptionOnSetDateWithEmit = this.shortCalendarSettings.callbackSetDateWithEmit.subscribe(this.selectDateWithEmit.bind(this));
    this.subscriptionOnSetDateWithoutEmit = this.shortCalendarSettings.callbackSetDateWithoutEmit.subscribe(this.selectDateWithoutEmit.bind(this));
    this.subscriptionOnSetDatesWithEmit = this.shortCalendarSettings.callbackSetDatesWithEmit.subscribe(this.selectDatesWithEmit.bind(this));
    this.subscriptionOnSetDatesWithoutEmit = this.shortCalendarSettings.callbackSetDatesWithoutEmit.subscribe(this.selectDatesWithoutEmit.bind(this));
  }

  public ngOnDestroy(): void {
    this.subscriptionOnClearDate?.unsubscribe();
    this.subscriptionOnSetDateWithEmit?.unsubscribe();
    this.subscriptionOnSetDateWithoutEmit?.unsubscribe();
    this.subscriptionOnSetDatesWithEmit?.unsubscribe();
    this.subscriptionOnSetDatesWithoutEmit?.unsubscribe();
  }

  /**
   * Добавляет на страницу метод закрытия календаря по нажатию вне его пределов
   */
  private calendarMouseListener(event: any): void {
    if (!this.calendarModal.nativeElement.contains(event.target)) {
      this.calendarClose();
    }
  }

  /**
   * Установка дат по неделям для вывода в таблице дней
   */
  private setDays(): ShortCalendarDay[][] {
    let month = [];
    let week: ShortCalendarDay[] = [];
    for (let i = 1; i <= 31; i++) {
      week.push({ dayNumber: i, isDisabled: false, isVisible: true })

      if (i % 7 == 0) {
        month.push([...week]);
        week = [];
      }
    }
    month.push([...week]);

    return month;
  }

  /**
   * Установка стандартных пустых значений
   * @returns пустые значения
   */
  private setDefaultValue(): ShortCalendarDates {
    return {
      firstMonth: null,
      firstDayNumber: null,
      secondMonth: null,
      secondDayNumber: null
    };
  }

  /**
   * Закрывает календарь
   * После закрытия удаляет функцию закрытия календаря по нажатию вне его пределов
   */
  private calendarClose(): void {
    this.isOpenedModal = false;
    this.closableCoverActive = false;
    this.isTodayDisabled = false;
    this.currentPeriod = PeriodType.Month;
    window.removeEventListener('mousedown', this.mouseListener);

    // Откатываем значение для единичного календаря, если был выбран только новый месяц
    if (!this.shortCalendarSettings.multiSelectable && this.shortCalendarSettings.selectedDates.firstDayNumber == null) {
      this.shortCalendarSettings.selectedDates.firstMonth = this.oldSelectedDate.firstMonth;
      this.shortCalendarSettings.selectedDates.firstDayNumber = this.oldSelectedDate.firstDayNumber;
    }

    // Если двойной календарь, то надо выбрать обе даты
    if (this.shortCalendarSettings.multiSelectable && this.shortCalendarSettings.selectedDates.secondDayNumber == null) {
      this.shortCalendarSettings.selectedDates.firstMonth = this.oldSelectedDate.firstMonth;
      this.shortCalendarSettings.selectedDates.firstDayNumber = this.oldSelectedDate.firstDayNumber;
      this.shortCalendarSettings.selectedDates.secondMonth = this.oldSelectedDate.secondMonth;
      this.shortCalendarSettings.selectedDates.secondDayNumber = this.oldSelectedDate.secondDayNumber;
    }
  }

  /**
   * Очищает дату в календаре
   * @param withEmit нужно ли делать обратный вызов после очистки (уйдут null самой собой)
   */
  private clearDate(withEmit: boolean): void {
    this.shortCalendarSettings.selectedDates = this.setDefaultValue();
    this.oldSelectedDate = this.setDefaultValue();

    // Если необходимо сделать обратный вызов
    if (withEmit) {
      this.sendCallbackEmits();
    }
  }

  /**
   * Установка даты с обратным вызовом
   */
  private selectDateWithEmit(date: ShortCalendarDate): void {
    this.selectDateWithoutEmit(date);
    this.sendCallbackEmits();
  }

  /**
   * Установка даты без обратного вызова
   */
  private selectDateWithoutEmit(date: ShortCalendarDate): void {
    if (this.shortCalendarSettings.multiSelectable) {
      return;
    }

    this.shortCalendarSettings.selectedDates.firstMonth = this.findMonth(date);
    this.shortCalendarSettings.selectedDates.firstDayNumber = date.dayNumber;
  }

  /**
   * Установка двух дат с обратным вызовом
   */
  private selectDatesWithEmit(dates: [ShortCalendarDate | null, ShortCalendarDate | null]): void {
    this.selectDatesWithoutEmit(dates)
    this.sendCallbackEmits();
  }

  /**
   * Установка двух дат без обратного вызова
   */
  private selectDatesWithoutEmit(dates: [ShortCalendarDate | null, ShortCalendarDate | null]): void {
    if (!this.shortCalendarSettings.multiSelectable) {
      return
    }

    if (dates[0] != null) {
      this.shortCalendarSettings.selectedDates.firstMonth = this.findMonth(dates[0]);
      this.shortCalendarSettings.selectedDates.firstDayNumber = dates[0].dayNumber;
    } else {
      this.shortCalendarSettings.selectedDates.firstMonth = null;
      this.shortCalendarSettings.selectedDates.firstDayNumber = null;
    }

    if (dates[1] != null) {
      this.shortCalendarSettings.selectedDates.secondMonth = this.findMonth(dates[1]);
      this.shortCalendarSettings.selectedDates.secondDayNumber = dates[1].dayNumber;
    } else {
      this.shortCalendarSettings.selectedDates.secondMonth = null;
      this.shortCalendarSettings.selectedDates.secondDayNumber = null;
    }
  }

  /**
   * Поиск месяца в общем списке
   */
  private findMonth(date: ShortCalendarDate): ShortCalendarMonth | null {
    for (let row of this.shortCalendarSettings.allMonth) {
      for (let month of row) {
        if (month.number == date.month) {
          return month;
        }
      }
    }

    return null;
  }

  /**
   * Исполнение обратных вызовов, чтобы передать выбранные значения
   */
  private sendCallbackEmits(): void {
    if (!this.shortCalendarSettings.multiSelectable) {
      this.shortCalendarSettings.callbackDate
        .emit(new ShortCalendarSendDate(this.shortCalendarSettings.selectedDates.firstMonth?.number ?? null, this.shortCalendarSettings.selectedDates.firstDayNumber));
      return;
    }

    this.shortCalendarSettings.callbackDates.emit([
      new ShortCalendarSendDate(this.shortCalendarSettings.selectedDates.firstMonth?.number ?? null, this.shortCalendarSettings.selectedDates.firstDayNumber),
      new ShortCalendarSendDate(this.shortCalendarSettings.selectedDates.secondMonth?.number ?? null, this.shortCalendarSettings.selectedDates.secondDayNumber)]);
  }

  /**
   * Открывает календарь
   * После открытия добавляет функцию закрытия календаря по нажатию вне его пределов
   */
  public calendarOpen(): void {
    if (this.shortCalendarSettings.isDisabled || this.isOpenedModal) {
      return;
    }

    this.isOpenedModal = true;

    if (this.shortCalendarSettings.isCover) {
      this.closableCoverActive = true;
      window.addEventListener('mousedown', this.mouseListener);
    }

    // Записываем старые значения
    this.oldSelectedDate.firstDayNumber = this.shortCalendarSettings.selectedDates.firstDayNumber;
    this.oldSelectedDate.secondDayNumber = this.shortCalendarSettings.selectedDates.secondDayNumber;
    this.oldSelectedDate.firstMonth = this.shortCalendarSettings.selectedDates.firstMonth;
    this.oldSelectedDate.secondMonth = this.shortCalendarSettings.selectedDates.secondMonth;

    // Выключение кнопки сегодня
    let currentMonth = this.shortCalendarSettings.baseDate.getMonth();
    let currentDay = this.shortCalendarSettings.baseDate.getDate();
    this.shortCalendarSettings.disabledDates.forEach(element => {
      if (element.month == currentMonth && element.dayNumber == currentDay) {
        this.isTodayDisabled = true;
      }
    });
  }

  /**
   * Устанавливает значение выбранной даты
   * Кнопка "Сегодня" в модальном окне календаря
   */
  public selectToday(): void {
    if (this.isTodayDisabled) {
      return;
    }

    let selectedMonth = this.shortCalendarSettings.baseDate.getMonth();
    let selectedShortCalendarMonth: ShortCalendarMonth | null = null;
    for (let row of this.shortCalendarSettings.allMonth) {
      for (let month of row) {
        if (month.number == selectedMonth) {
          selectedShortCalendarMonth = month;
          break;
        }
      }
    }

    // Если единичный календарь, то только первая дата
    if (!this.shortCalendarSettings.multiSelectable) {
      this.shortCalendarSettings.selectedDates.firstMonth = selectedShortCalendarMonth;
      this.shortCalendarSettings.selectedDates.firstDayNumber = this.shortCalendarSettings.baseDate.getDate();
    }

    // Если двойной, то в зависимости от указываемой даты
    if (this.shortCalendarSettings.multiSelectable) {
      let isNotHaveFirstDate = this.shortCalendarSettings.selectedDates.firstMonth == null || this.shortCalendarSettings.selectedDates.firstDayNumber == null;
      let isHaveSecondDate = this.shortCalendarSettings.selectedDates.secondMonth != null && this.shortCalendarSettings.selectedDates.secondDayNumber != null;
      if (isNotHaveFirstDate || !isNotHaveFirstDate && isHaveSecondDate) {
        this.shortCalendarSettings.selectedDates.firstMonth = selectedShortCalendarMonth;
        this.shortCalendarSettings.selectedDates.firstDayNumber = this.shortCalendarSettings.baseDate.getDate();
        this.currentPeriod = PeriodType.Month;
        this.shortCalendarSettings.selectedDates.secondMonth = null;
        this.shortCalendarSettings.selectedDates.secondDayNumber = null;
        this.isTodayDisabled = !this.shortCalendarSettings.selectedEqualsDates;
        return;
      }

      this.shortCalendarSettings.selectedDates.secondMonth = selectedShortCalendarMonth;
      this.shortCalendarSettings.selectedDates.secondDayNumber = this.shortCalendarSettings.baseDate.getDate();

      this.sortDates();
    }

    this.calendarClose();
    this.sendCallbackEmits();
  }

  /**
   * Устанавливает значение месяца для даты отображения
   * Происходит при выборе месяца в таблице месяцев модального окна
   * @param month выбранный месяц
   */
  public selectMonth(month: ShortCalendarMonth): void {
    if (!this.shortCalendarSettings.multiSelectable) {
      this.shortCalendarSettings.selectedDates.firstMonth = month;
      this.shortCalendarSettings.selectedDates.firstDayNumber = null;
    }

    if (this.shortCalendarSettings.multiSelectable) {
      if (this.shortCalendarSettings.selectedDates.firstMonth == null || this.shortCalendarSettings.selectedDates.secondMonth != null) {
        this.shortCalendarSettings.selectedDates.firstMonth = month;
        this.shortCalendarSettings.selectedDates.firstDayNumber = null;
        this.shortCalendarSettings.selectedDates.secondMonth = null;
        this.shortCalendarSettings.selectedDates.secondDayNumber = null;
      } else {
        this.shortCalendarSettings.selectedDates.secondMonth = month;
      }
    }

    this.currentPeriod = PeriodType.Day;

    // Если нет выключенных дат
    if (this.shortCalendarSettings.disabledDates.length == 0) {
      this.setDisabledAndVisibleDays(month, null);
      return;
    }

    // Если есть выключенные даты, то проходим их
    let numberDays: number[] = [];
    this.shortCalendarSettings.disabledDates.forEach(element => {
      if (element.month == month.number) {
        numberDays.push(element.dayNumber);
      }
    });

    this.setDisabledAndVisibleDays(month, numberDays);
  }

  /**
   * Установка видимости и отключения дат в календаре
   * @param month выбранный месяц
   * @param disabledDates выключенные дни
   */
  private setDisabledAndVisibleDays(month: ShortCalendarMonth, disabledDates: number[] | null): void {
    this.allDays.forEach(week => {
      week.forEach(day => {
        let isHaveDisabledDates = disabledDates != null && disabledDates.includes(day.dayNumber);
        let isNotHaveEqualsDates = this.shortCalendarSettings.multiSelectable && !this.shortCalendarSettings.selectedEqualsDates;
        let isEqualMonth = this.shortCalendarSettings.selectedDates.firstMonth == this.shortCalendarSettings.selectedDates.secondMonth;
        let isEqualDay = this.shortCalendarSettings.selectedDates.firstDayNumber == day.dayNumber;

        day.isVisible = day.dayNumber <= month.countDays;
        day.isDisabled = isHaveDisabledDates || isNotHaveEqualsDates && isEqualMonth && isEqualDay;
      });
    });
  }

  /**
   * Устанавливает значение дня для дат
   * После установки значения даты передает его значение в соответствующий коллбек, если есть соответствующий флаг
   * Происходит при выборе в таблице дней в модальном окне календаря, при нажатии кнопки Сегодня и при установке значения из вне компонента
   * @param day выбранный день
   */
  public selectDay(day: ShortCalendarDay): void {
    if (day.isDisabled) {
      return;
    }

    if (!this.shortCalendarSettings.multiSelectable) {
      this.shortCalendarSettings.selectedDates.firstDayNumber = day.dayNumber;
    }

    if (this.shortCalendarSettings.multiSelectable) {
      if (this.shortCalendarSettings.selectedDates.firstDayNumber == null) {
        this.shortCalendarSettings.selectedDates.firstDayNumber = day.dayNumber;
        this.currentPeriod = PeriodType.Month;

        // Проверка кнопки сегодня (надо ли блокировать)
        let equalMonth = this.shortCalendarSettings.selectedDates.firstMonth?.number == this.shortCalendarSettings.baseDate.getMonth();
        let equalDay = this.shortCalendarSettings.selectedDates.firstDayNumber == this.shortCalendarSettings.baseDate.getDate();
        if (equalMonth && equalDay && !this.shortCalendarSettings.selectedEqualsDates) {
          this.isTodayDisabled = true;
        }

        return;
      }

      // Если выбрана такая же дата, но стоит запрет, то прерываем выполнение (доп. проверка)
      let equalMonth = this.shortCalendarSettings.selectedDates.firstMonth == this.shortCalendarSettings.selectedDates.secondMonth;
      let equalDays = this.shortCalendarSettings.selectedDates.firstDayNumber == day.dayNumber;
      if (!this.shortCalendarSettings.selectedEqualsDates && equalMonth && equalDays) {
        return;
      }

      this.shortCalendarSettings.selectedDates.secondDayNumber = day.dayNumber;
      this.sortDates();
    }

    this.calendarClose();
    this.sendCallbackEmits();
  }

  /**
   * Сортировка дней по порядку
   * * Если гидрогод, то необходимо переворачивать только тогда, когда даты с одной из сторон от даты горы (humpDate)
   */
  private sortDates(): void {
    let firstMonth = this.shortCalendarSettings.selectedDates.firstMonth;
    let secondMonth = this.shortCalendarSettings.selectedDates.secondMonth;
    let firstDay = this.shortCalendarSettings.selectedDates.firstDayNumber;
    let secondDay = this.shortCalendarSettings.selectedDates.secondDayNumber;
    if (firstMonth == null || secondMonth == null || firstDay == null || secondDay == null) {
      return;
    }

    // Проверяем на необходимость переворачивать дату из-за гидрогода
    if (!this.checkNeedReverse(firstMonth.number, secondMonth.number, firstDay, secondDay)) {
      return;
    }

    let tempNumberDay = this.shortCalendarSettings.selectedDates.firstDayNumber;
    let monthComparison = this.isIncreaseSort ? firstMonth.number > secondMonth.number : firstMonth.number < secondMonth.number;
    let dayComparison = this.isIncreaseSort ? firstDay > secondDay : firstDay < secondDay;

    if (monthComparison) {
      let tempMonth = firstMonth;

      this.shortCalendarSettings.selectedDates.firstMonth = secondMonth;
      this.shortCalendarSettings.selectedDates.secondMonth = tempMonth;
      this.shortCalendarSettings.selectedDates.firstDayNumber = secondDay;
      this.shortCalendarSettings.selectedDates.secondDayNumber = tempNumberDay;
    }

    // Если месяца одинаковые, то меняем дни местами при выполнении условия
    if (firstMonth.number == secondMonth.number && dayComparison) {
      this.shortCalendarSettings.selectedDates.firstDayNumber = secondDay;
      this.shortCalendarSettings.selectedDates.secondDayNumber = tempNumberDay;
    }
  }

  /**
   * Проверка необходимости переворачивать (только для гидрогода)
   * @param firstMonth номер первого месяца
   * @param secondMonth номер второго месяца
   * @param firstDay номер первого дня
   * @param secondDay номер второго дня
   */
  private checkNeedReverse(firstMonth: number, secondMonth: number, firstDay: number, secondDay: number): boolean {
    if (!this.shortCalendarSettings.isHydroYear) {
      return true;
    }

    let firstDateMoreHump = firstMonth > this.shortCalendarSettings.humpDateForHydroYear.month
      || firstMonth == this.shortCalendarSettings.humpDateForHydroYear.month && firstDay >= this.shortCalendarSettings.humpDateForHydroYear.dayNumber;
    let firstDateLessHump = firstMonth < this.shortCalendarSettings.humpDateForHydroYear.month
      || firstMonth == this.shortCalendarSettings.humpDateForHydroYear.month && firstDay < this.shortCalendarSettings.humpDateForHydroYear.dayNumber;

    let secondDateMoreHump = secondMonth > this.shortCalendarSettings.humpDateForHydroYear.month
      || secondMonth == this.shortCalendarSettings.humpDateForHydroYear.month && secondDay >= this.shortCalendarSettings.humpDateForHydroYear.dayNumber;
    let secondDateLessHump = secondMonth < this.shortCalendarSettings.humpDateForHydroYear.month
      || secondMonth == this.shortCalendarSettings.humpDateForHydroYear.month && secondDay < this.shortCalendarSettings.humpDateForHydroYear.dayNumber;

    // Если первое меньше, а второе больше, то надо перевернуть
    this.isIncreaseSort = !(firstDateLessHump && secondDateMoreHump);

    return firstDateMoreHump && secondDateMoreHump || firstDateLessHump && secondDateLessHump || firstDateLessHump && secondDateMoreHump;
  }
}