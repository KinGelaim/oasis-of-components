import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisCalendarComponent } from '@oasis/calendar';

import { CalendarSettingsMain } from './settings/calendar-settings-main.class';
import { CalendarSettingsType } from './settings/calendar-settings-type.class';
import { CalendarSettingsVisual } from './settings/calendar-settings-visual.class';
import { CalendarSettingsDynamicChange } from './settings/calendar-settings-dynamic-change.class';
import { CalendarSettingsHandleChanged } from './settings/calendar-settings-handle-change.class';

// TODO: убрать FormsModule
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, OasisCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  /** Настройки для обычных календарей */
  public calendarSettingsMain = new CalendarSettingsMain();

  /** Настройки для календарей с определенными днями (дни недели, выбранные дни, график работы) */
  public calendarSettingsType = new CalendarSettingsType();

  /** Настройки для календарей с разными отображениями */
  public calendarSettingsVisual = new CalendarSettingsVisual();

  /** Настройки для календаря с динамическим изменением свойств */
  public calendarSettingsDynamicChange = new CalendarSettingsDynamicChange();

  /** Ручное открытие календаря и "обертка" календаря */
  public calendarSettingsHandleChanged = new CalendarSettingsHandleChanged();
}