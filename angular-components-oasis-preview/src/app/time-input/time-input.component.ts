import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisTimeInputComponent, TimeInputSettings, TimeInputType, TimeInputUnit, TimeInputVisualType } from '@oasis/time-input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [FormsModule, NgxMaterialTimepickerModule, OasisTimeInputComponent],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.scss'
})
export class TimeInputComponent {
  /** Настройки компонента */
  public timeInputSettings: TimeInputSettings;

  /** Алиас типа компонента */
  public TimeInputType = TimeInputType;

  /** Алиас ед. измерения компонента */
  public TimeInputUnit = TimeInputUnit;

  public TimeInputVisualType = TimeInputVisualType;

  /** Часы, которые пришли из компонента */
  public hours: number | null = null;

  /** Минуты, которые пришли из компонента */
  public minutes: number | null = null;

  /** Фокус на временное поле ввода */
  public isFocus: boolean = false;

  public constructor() {
    this.timeInputSettings = new TimeInputSettings();
  }

  /**
   * Изменение типа компонента
   */
  public setType(event: any): void {
    this.timeInputSettings.type = event.target.value;
  }

  /**
   * Значение, которое пришло из компонента
   */
  public valueChange(value: [number | null, number | null]): void {
    this.hours = value[0];
    this.minutes = value[1];
  }

  /**
   * Изменить цвет фона в компоненте
   */
  public changeBackgroundColor(event: any): void {
    this.timeInputSettings.backgroundColor = event.target.value;
  }

  /**
   * Изменить цвет обводки в компоненте
   */
  public changeBorderColor(event: any): void {
    this.timeInputSettings.borderColor = event.target.value;
  }

  /**
   * Изменить цвет шрифта в компоненте
   */
  public changeFontColor(event: any): void {
    this.timeInputSettings.fontColor = event.target.value;
  }

  /**
   * Изменение фокуса
   */
  public setFocus(value: boolean): void {
    this.isFocus = value;
  }

  /**
   * Изменение границы минимального значения в компоненте
   * @param event новое время
   */
  public changeMinValue(event: any): void {
    const split = event.split(':');
    this.timeInputSettings.setMinValue(split[0], split[1]);
  }

  /**
   * Изменение границы максимального значения в компоненте
   * @param event новое время
   */
  public changeMaxValue(event: any): void {
    const split = event.split(':');
    this.timeInputSettings.setMaxValue(split[0], split[1]);
  }

  /**
   * Получить значение из компонента
   */
  public getValue(): void {
    console.log(this.timeInputSettings.getValue());
  }
}