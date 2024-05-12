import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { CalendarSettings } from './shared/calendar-settings.model';
import { PeriodType } from './models/period-type.enum';
import { CalendarUnit } from './shared/calendar-unit.enum';
import { CalendarService } from './services/calendar.service';
import { CalendarTableGeneratorService } from './services/calendar-table-generator.service';
import { DateHelper } from './helpers/date-helper.class';

@Component({
  selector: 'oasis-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'oasis-calendar.component.html',
  styleUrl: 'oasis-calendar.component.scss'
})
export class OasisCalendarComponent implements OnInit, OnDestroy {
  /** Ссылка на поле календаря */
  @ViewChild('calendarDatepicker')
  private calendarDatepicker!: ElementRef;

  /** Ссылка на модальное окна календаря */
  @ViewChild('calendarModal')
  private calendarModal!: ElementRef;

  /** Основные настройки календаря */
  @Input()
  public calendarSettings!: CalendarSettings;

  /** Открытие/закрытие календаря */
  @Input()
  public changeVisibleCalendar: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Передача события hover (только когда календарь закрыт) */
  @Output()
  public mouseenterWhenCalendarClosed: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события blur (только когда календарь закрыт) */
  @Output()
  public mouseleaveWhenCalendarClosed: EventEmitter<any> = new EventEmitter<any>();

  /** Открытие модального окна календаря */
  public isOpenedModal: boolean = false;

  /** Текущий отображаемый тип периода */
  public periodTypeShown: PeriodType = PeriodType.Day;

  /** Алиас на тип периода */
  public PeriodType = PeriodType;

  /** Алиас на ширину календаря */
  public CalendarUnit = CalendarUnit;

  // Отображение стрелок переключения дат
  public isDisabledUpArrow: boolean = false;
  public isDisabledDownArrow: boolean = false;

  /** Сервис для обработки дат */
  public calendarService: CalendarService | null = null;

  /** Сервис для построения таблиц календаря */
  public calendarTableGeneratorService: CalendarTableGeneratorService | null = null;

  /** Отвечает за открытие/закрытие обложки при открытом календаре */
  public closableCoverActive: boolean = false;

  /** Ссылка на метод для отслеживание нажатии кнопки мыши */
  private mouseListener = this.calendarMouseListener.bind(this);

  /** Шаг переключения месяцев */
  public readonly MONTH_STEP: number = 1;

  /** Шаг переключения годов */
  public readonly YEAR_STEP: number = 9;

  /** Нужно ли развернуть модальное окно календаря */
  public isVerticalReverseModal: boolean = false;

  // Подписки
  private subscriptionOnSetDateWithEmit: Subscription | null = null;
  private subscriptionOnSetDateWithoutEmit: Subscription | null = null;
  private subscriptionOnSetDatesWithEmit: Subscription | null = null;
  private subscriptionOnSetDatesWithoutEmit: Subscription | null = null;
  private subscriptionOnSetToday: Subscription | null = null;
  private subscriptionOnClearDate: Subscription | null = null;
  private subscriptionOnChangeVisible: Subscription | null = null;

  public ngOnInit(): void {
    this.subscriptionOnSetDateWithEmit = this.calendarSettings.callbackSetDateWithEmit.subscribe(this.selectDayWithEmit.bind(this));
    this.subscriptionOnSetDateWithoutEmit = this.calendarSettings.callbackSetDateWithoutEmit.subscribe(this.selectDayWithoutEmit.bind(this));

    this.subscriptionOnSetDatesWithEmit = this.calendarSettings.callbackSetDatesWithEmit.subscribe(this.selectDaysWithEmit.bind(this));
    this.subscriptionOnSetDatesWithoutEmit = this.calendarSettings.callbackSetDatesWithoutEmit.subscribe(this.selectDaysWithoutEmit.bind(this));

    this.subscriptionOnSetToday = this.calendarSettings.callbackSetToday.subscribe(this.selectToday.bind(this));
    this.subscriptionOnClearDate = this.calendarSettings.callbackClearDate.subscribe(this.clearDate.bind(this));
    this.subscriptionOnChangeVisible = this.changeVisibleCalendar.subscribe(this.setVisibleCalendar.bind(this));

    this.calendarService = new CalendarService(this.calendarSettings);
    this.calendarService.setLimitOfDates();

    this.calendarTableGeneratorService = new CalendarTableGeneratorService(this.calendarSettings);

    // Прокидываем ссылки на сервисы в настройки, чтобы потом обращаться к ним
    this.calendarSettings.calendarService = this.calendarService;
    this.calendarSettings.calendarTableGeneratorService = this.calendarTableGeneratorService;
  }

  public ngOnDestroy(): void {
    this.subscriptionOnSetDateWithEmit?.unsubscribe();
    this.subscriptionOnSetDateWithoutEmit?.unsubscribe();
    this.subscriptionOnSetDatesWithEmit?.unsubscribe();
    this.subscriptionOnSetDatesWithoutEmit?.unsubscribe();
    this.subscriptionOnSetToday?.unsubscribe();
    this.subscriptionOnClearDate?.unsubscribe();
    this.subscriptionOnChangeVisible?.unsubscribe();
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
   * Очищает дату в календаре
   * @param withEmit нужно ли делать обратный вызов после очистки (уйдут null самой собой)
   */
  private clearDate(withEmit: boolean): void {
    if (this.calendarService == null) {
      return;
    }

    this.calendarService.selectedDate = null;
    this.calendarService.selectedFirstDate = null;
    this.calendarService.selectedSecondDate = null;

    if (withEmit) {
      this.sendCallbackEmits();
    }
  }

  /**
   * Открывает календарь
   * После открытия добавляет функцию закрытия календаря по нажатию вне его пределов
   * Таблица календаря генерируется в момент открытия
   */
  public calendarOpen(): void {
    if (this.calendarSettings.isDisabled || this.isOpenedModal) {
      return;
    }

    this.calculateReverseDisclosure();
    
    this.isOpenedModal = true;

    if (this.calendarSettings.isCover) {
      this.closableCoverActive = true;
      window.addEventListener('mousedown', this.mouseListener);
    }

    if (this.calendarService?.selectedDate != null) {
      this.calendarService.viewDate = DateHelper.CopyDateWithoutTime(this.calendarService.selectedDate);
    }

    if (this.calendarService?.viewDate != null) {
      this.generateCalendarTables(this.calendarService.viewDate);
    }
  }

  /**
   * Метод для установки флага о развороте модального окна календаря
   */
  private calculateReverseDisclosure(): void {
    if (this.calendarSettings.isNeedVerticalReverse) {
      this.isVerticalReverseModal = true;
      return;
    }

    if (!this.calendarSettings.isNeedCalculateVerticalReverse) {
      this.isVerticalReverseModal = false;
      return;
    }

    let comboBoxElement = this.calendarDatepicker.nativeElement;
    let dropDownElement = this.calendarModal.nativeElement;

    // * Необходимо, чтобы рассчитать высоту элемента, которого ещё нет на странице
    dropDownElement.style.opacity = 0;

    setTimeout(() => {
      let comboBoxRect = comboBoxElement.getBoundingClientRect();
      let stylesDropDownElement = window.getComputedStyle(dropDownElement);
      let height = parseFloat(stylesDropDownElement.height);
      
      if (isNaN(height)) {
        height = parseFloat(stylesDropDownElement.minHeight);
      }

      let distanceFromBottomScreen = window.innerHeight - comboBoxRect.bottom;

      let isPossibleReverse = window.innerHeight >= distanceFromBottomScreen + height;
      let isNeedReverse = distanceFromBottomScreen < height;

      this.isVerticalReverseModal = isPossibleReverse && isNeedReverse;

      // Возвращаем видимость элемента
      dropDownElement.style.opacity = 1;
    });
  }

  /**
   * Закрывает календарь
   * После закрытия удаляет функцию закрытия календаря по нажатию вне его пределов
   */
  public calendarClose(): void {
    this.isOpenedModal = false;
    this.closableCoverActive = false;
    window.removeEventListener('mousedown', this.mouseListener);
    this.calendarSettings.callbackCloseCalendar.emit(true);
  }

  /**
   * Изменение видимости табличной части модального окна календаря
   * @param isOpen новое значение флага
   */
  private setVisibleCalendar(isOpen: boolean): void {
    if (isOpen) {
      this.calendarOpen();
    } else {
      this.calendarClose();
    }
  }

  /**
   * Создание таблиц для модального окна компонента календарь
   * @param day день вокруг которого создаются таблицы
   */
  private generateCalendarTables(day: Date | null): void {
    if (this.calendarService == null || this.calendarTableGeneratorService == null || day == null) {
      return;
    }

    this.calendarTableGeneratorService.generateDays(day, this.calendarService.selectedDate, this.calendarService.selectedFirstDate, this.calendarService.selectedSecondDate);
    this.calendarTableGeneratorService.generateMonths(day);
    this.calendarTableGeneratorService.generateYears(day);

    this.checkUpArrow(day);
    this.checkDownArrow(day);
  }

  /**
   * Метод проверки на возможность использовать стрелку на предыдущий период
   */
  private checkUpArrow(date: Date): void {
    this.isDisabledUpArrow = this.calendarSettings.bottomDate != null &&
      (!this.calendarSettings.multiSelectable && DateHelper.GetLastDayOfMonth(this.calendarSettings.bottomDate) >= date ||
      this.calendarSettings.multiSelectable && DateHelper.GetLastDayOfMonth(this.calendarSettings.bottomDate) >= date);
  }

  /**
   * Метод проверки на возможность использовать стрелку на следующий период
   */
  private checkDownArrow(date: Date): void {
    this.isDisabledDownArrow = this.calendarSettings.topDate != null &&
      (!this.calendarSettings.multiSelectable && DateHelper.GetFirstDayOfMonth(this.calendarSettings.topDate) <= date ||
      this.calendarSettings.multiSelectable && DateHelper.GetFirstDayOfMonth(this.calendarSettings.topDate) <= date);
  }

  /**
   * Устанавливает значение выбранной даты
   * Кнопка "Сегодня" в модальном окне календаря
   */
  public selectToday(): void {
    if (this.calendarService == null) {
      return;
    }

    let value: Date = DateHelper.CopyDateWithoutTime(this.calendarSettings.baseDate);

    this.selectDayWithEmit(value);
  }

  /**
   * Выбор даты с обратным вызовом
   * @param day новая дата
   */
  public selectDayWithEmit(day: Date): void {
    this.selectDay(day, true);
  }

  /**
   * Выбор даты без обратного вызова
   * @param day новая дата
   */
  private selectDayWithoutEmit(day: Date): void {
    this.selectDay(day, false);
  }

  /**
   * Выбор дат с обратным вызовом
   * @param dates новые даты
   */
  private selectDaysWithEmit(dates: [Date | null, Date | null]): void {
    if (dates[0] != null) {
      if (dates[1] != null) {
        this.selectDayWithoutEmit(dates[0]);
      } else {
        this.selectDayWithEmit(dates[0]);
      }
    }

    if (dates[1] != null) {
      this.selectDayWithEmit(dates[1]);
    }
  }

  /**
   * Выбор дат без обратного вызова
   * @param dates новые даты
   */
  private selectDaysWithoutEmit(dates: [Date | null, Date | null]): void {
    if (dates[0] != null) {
      this.selectDayWithoutEmit(dates[0]);
    }

    if (dates[1] != null) {
      this.selectDayWithoutEmit(dates[1]);
    }
  }

  /**
   * Устанавливает значение дня для дат
   * После установки значения даты передает его значение в соответствующий коллбек, если есть соответствующий флаг
   * Происходит при выборе в таблице дней в модальном окне календаря, при нажатии кнопки Сегодня и при установки значения из вне компонента
   * @param day выбранный день
   * @param withEmit нужно ли делать обратный вызов
   */
  private selectDay(day: Date, withEmit: boolean): void {
    if (this.calendarService == null) {
      return;
    }

    // Перестраиваем таблицу
    this.calendarService.viewDate = DateHelper.CopyDateWithoutTime(day);
    this.generateCalendarTables(this.calendarService.viewDate);

    // Извлекаем получившийся день и если его можно выбрать то выбираем
    let calendarDay = this.calendarTableGeneratorService?.getDayFromArray(day);

    if (!calendarDay?.isDisabled) {
      this.changeDates(new Date(day), withEmit);
      this.generateCalendarTables(this.calendarService.viewDate);
    }
  }

  /**
   * Меняет даты и если нужно, то передаёт их в обратный вызов
   * @param day новая дата
   * @param withEmit нужно ли использовать обратный вызов
   */
  private changeDates(day: Date, withEmit: boolean): void {
    if (this.calendarService == null) {
      return;
    }

    this.calendarService.changeDates(day);

    if (withEmit) {
      this.sendCallbackEmits();
    }
  }

  /**
   * Исполнение обратных вызовов, чтобы передать выбранные значения
   */
  private sendCallbackEmits(): void {
    if (!this.calendarSettings.multiSelectable) {
      this.calendarSettings.callbackDate.emit(this.calendarService?.selectedDate);
      return;
    }

    this.calendarSettings.callbackDates.emit([this.calendarService?.selectedFirstDate ?? null, this.calendarService?.selectedSecondDate ?? null]);
  }

  /**
   * Выделяет дату при наведении
   * Используется только для календаря с диапазоном дат
   */
  public hoverMulti(hoverElement: Date): void {
    if (this.calendarSettings.multiSelectable && this.calendarService?.selectedFirstDate != null && this.calendarService?.selectedSecondDate == null) {
      this.calendarTableGeneratorService?.hoverDatesMulti(this.calendarService.selectedFirstDate, hoverElement);
    }
  }

  /**
   * Перелистывает месяцы календаря (на стрелочках в таблице дней)
   * @param stepMonth шаг переключения
   */
  public switchMonths(stepMonth: number): void {
    if (this.calendarService == null) {
      return;
    }

    if (stepMonth < 0 && this.isDisabledUpArrow || stepMonth > 0 && this.isDisabledDownArrow) {
      return;
    }

    this.calendarService.switchMonths(stepMonth);
    this.generateCalendarTables(this.calendarService.viewDate);
  }

  /**
   * Устанавливает значение месяца для даты отображения
   * Происходит при выборе месяца в таблице месяцев модального окна
   * @param month выбранный месяц
   */
  public selectMonth(month: Date): void {
    if (this.calendarService == null || this.calendarTableGeneratorService == null) {
      return;
    }

    let findItem = this.calendarTableGeneratorService.getMonthFromArray(month);
    if (findItem != null) {
      this.calendarService.changeMonth(month);
      this.changePeriodType(PeriodType.Day);
      this.generateCalendarTables(this.calendarService.viewDate);
    }
  }

  /**
   * Перелистывает годы календаря (на стрелочках в таблице годов)
   * @param stepYear шаг переключения годов
   */
  public switchYears(stepYear: number): void {
    if (this.calendarService == null) {
      return;
    }

    if (stepYear < 0 && this.isDisabledUpArrow || stepYear > 0 && this.isDisabledDownArrow) {
      return;
    }

    this.calendarService.switchYears(stepYear);
    this.generateCalendarTables(this.calendarService.viewDate);
  }

  /**
   * Устанавливает значение года для субъекта даты
   * Происходит при выборе года в таблице годов модального окна
   * @param year выбранный год
   */
  public selectYear(year: Date): void {
    if (this.calendarService == null || this.calendarTableGeneratorService == null) {
      return;
    }

    let findItem = this.calendarTableGeneratorService.getYearFromArray(year);
    if (findItem != null) {
      this.calendarService.changeYear(year);
      this.changePeriodType(PeriodType.Month);
      this.generateCalendarTables(this.calendarService.viewDate);
    }
  }

  /**
   * Смена отображаемого периода
   * @param periodType новый период
   */
  public changePeriodType(periodType: PeriodType): void {
    this.periodTypeShown = periodType;
  }

  /**
   * Наведение мыши на календарь
   */
  public calendarMouseEnter(event: any): void {
    if (this.isOpenedModal) {
      return;
    }

    this.mouseenterWhenCalendarClosed.emit(event);
  }

  /**
   * Убрана мышь с календаря
   */
  public calendarMouseLeave(event: any): void {
    if (this.isOpenedModal) {
      return;
    }

    this.mouseleaveWhenCalendarClosed.emit(event);
  }
}