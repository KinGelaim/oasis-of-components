import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonSettings } from './shared/button-settings.class';
import { ButtonUnit } from './shared/button-unit.enum';
import { ButtonType } from './shared/button-type.enum';
import { ButtonIconPosition } from './shared/button-icon-position.enum';
import { ButtonState } from './shared/button-state.enum';

@Component({
  selector: 'oasis-button',
  standalone: true,
  imports: [],
  templateUrl: './oasis-button.component.html',
  styleUrl: './oasis-button.component.scss'
})
export class OasisButtonComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public buttonSettings!: ButtonSettings;

  /** Передача нажатия кнопки */
  @Output()
  public onClick: EventEmitter<any> = new EventEmitter<any>();

  /** Алиас единицы измерения компонента */
  public ButtonUnit = ButtonUnit;

  /** Алиас типа кнопки */
  public ButtonType = ButtonType;

  /** Алиас расположения иконки */
  public ButtonIconPosition = ButtonIconPosition;

  /** Алиас состояния кнопки */
  public ButtonState = ButtonState;

  /** Получение текущей иконки */
  public get currentIcon(): string | null {
    if (this.buttonSettings.type == ButtonType.Main || this.buttonSettings.state == ButtonState.Default) {
      return this.buttonSettings.defaultIconUrl;
    }

    if (this.buttonSettings.state == ButtonState.Hover) {
      return this.buttonSettings.hoverIconUrl;
    }

    if (this.buttonSettings.state == ButtonState.Click) {
      return this.buttonSettings.clickIconUrl;
    }

    return this.buttonSettings.disabledIconUrl;
  }

  /** Получение текущего цвета */
  public get currentColor(): string {
    switch (this.buttonSettings.state) {
      case ButtonState.Default:
        return this.buttonSettings.backgroundDefaultColor;

      case ButtonState.Hover:
        return this.buttonSettings.backgroundHoverColor;
        
      case ButtonState.Click:
        return this.buttonSettings.backgroundClickColor;
    }

    return this.buttonSettings.backgroundDisabledColor;
  }

  /** Индекс левой кнопки */
  private leftButtonIndex = 0;

  /**
   * Наведение курсора на кнопку
   */
  public mouseOver(event: any): void {
    if (this.isNotAccessButton(event.button)) {
      return;
    }

    this.buttonSettings.state = ButtonState.Hover;
  }

  /**
   * Нажатие ЛКМ по кнопке
   */
  public mouseDown(event: any): void {
    if (this.isNotAccessButton(event.button)) {
      return;
    }

    this.buttonSettings.state = ButtonState.Click;
  }

  /**
   * Отпускание ЛКМ с кнопки
   */
  public mouseUp(event: any): void {
    if (this.isNotAccessButton(event.button)) {
      return;
    }

    this.buttonSettings.state = ButtonState.Hover;
  }

  /**
   * Покидание области нажатия кнопки
   */
  public mouseOut(event: any): void {
    if (this.isNotAccessButton(event.button)) {
      return;
    }

    this.buttonSettings.state = ButtonState.Default;
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
    return this.buttonSettings.state == ButtonState.Disabled || mouseIndex != this.leftButtonIndex;
  }
}