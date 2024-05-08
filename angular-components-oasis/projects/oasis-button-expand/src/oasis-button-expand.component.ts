import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonExpandSettings } from './shared/button-expand-settings.class';
import { ButtonExpandState } from './shared/button-expand-state.enum';
import { ButtonExpandSize } from './shared/button-expand-size.enum';
import { ButtonExpandUnit } from './shared/button-expand-unit.enum';

@Component({
  selector: 'oasis-button-expand',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-button-expand.component.html',
  styleUrl: 'oasis-button-expand.component.scss'
})
export class OasisButtonExpandComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public buttonExpandSettings!: ButtonExpandSettings;

  /** Передача нажатия кнопки */
  @Output()
  public onClick: EventEmitter<any> = new EventEmitter<any>();

  /** Алиас состояния кнопки */
  public ButtonExpandState = ButtonExpandState;

  /** Алиас размеров раздвигающейся кнопки */
  public ButtonExpandSize = ButtonExpandSize;

  /** Получение ширины компонента */
  public get widthButton(): string {
    // Если наведенное состояние
    let expandState = this.buttonExpandSettings.state == ButtonExpandState.Hover || this.buttonExpandSettings.state == ButtonExpandState.Click;
    if (expandState && this.buttonExpandSettings.isExpand) {
      return this.buttonExpandSettings.widthUnit != ButtonExpandUnit.None
        ? this.buttonExpandSettings.widthExpandButtonHover + this.buttonExpandSettings.widthUnit
        : 'auto';
    }

    // Если большой размер
    if (this.buttonExpandSettings.size == ButtonExpandSize.Large) {
      return this.buttonExpandSettings.widthExpandButtonDefaultLarge + 'px';
    }

    // Если средний размер
    if (this.buttonExpandSettings.size == ButtonExpandSize.Medium) {
      return this.buttonExpandSettings.widthExpandButtonDefaultMiddle + 'px';
    }

    return this.buttonExpandSettings.widthExpandButtonDefaultSmall + 'px';
  }

  /** Индекс левой кнопки */
  private leftButtonIndex = 0;

  /**
   * Наведение курсора на кнопку
   */
  public mouseOver(event: any): void {
    if (this.isNotAccessButton(event.button) || !this.buttonExpandSettings.isExpand) {
      return;
    }

    this.buttonExpandSettings.state = ButtonExpandState.Hover;
  }

  /**
   * Нажатие ЛКМ по кнопке
   */
  public mouseDown(event: any): void {
    if (this.isNotAccessButton(event.button) || !this.buttonExpandSettings.isExpand) {
      return;
    }

    this.buttonExpandSettings.state = ButtonExpandState.Click;
  }

  /**
   * Отпускание ЛКМ с кнопки
   */
  public mouseUp(event: any): void {
    if (this.isNotAccessButton(event.button) || !this.buttonExpandSettings.isExpand) {
      return;
    }

    this.buttonExpandSettings.state = ButtonExpandState.Hover;
  }

  /**
   * Покидание области нажатия кнопки
   */
  public mouseOut(event: any): void {
    if (this.isNotAccessButton(event.button)) {
      return;
    }

    this.buttonExpandSettings.state = ButtonExpandState.Default;
  }

  /**
   * Нажатие кнопки
   */
  public clickButton(event: any): void {
    if (this.isNotAccessButton(event.button)) {
      return;
    }

    this.onClick.emit();
  }

  /**
   * Проверка на возможность взаимодействовать с кнопкой
   * @param mouseIndex индекс клавиши мыши
   */
  private isNotAccessButton(mouseIndex: number): boolean {
    return this.buttonExpandSettings.state == ButtonExpandState.Disabled || mouseIndex != this.leftButtonIndex;
  }
}