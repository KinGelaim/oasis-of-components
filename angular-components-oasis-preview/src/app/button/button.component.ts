import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisButtonComponent, ButtonSettings, ButtonIconPosition, ButtonType, ButtonState, ButtonUnit, ButtonSize } from '@oasis/button';

// TODO: убрать FormsModule
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FormsModule, OasisButtonComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /** Текущие настройки */
  public buttonSettings!: ButtonSettings;

  /** Алиас расположения иконки */
  public ButtonIconPosition = ButtonIconPosition;

  /** Алиас типа кнопки */
  public ButtonType = ButtonType;

  /** Алиас статуса кнопки */
  public ButtonState = ButtonState;

  /** Алиас типа измерения компонента */
  public ButtonUnit = ButtonUnit;

  /** Алиас размеров кнопки */
  public ButtonSize = ButtonSize;

  public constructor() {
    this.buttonSettings = new ButtonSettings();
    this.buttonSettings.textButton = 'Кнопка';
    this.buttonSettings.positionIconUrl = ButtonIconPosition.Right;
    this.buttonSettings.type = ButtonType.Main;

    // Задаем картинки и меняем статус, чтобы назначить картинку
    this.buttonSettings.defaultIconUrl = './assets/test-assets/button/icon__add_white.png'
    this.buttonSettings.hoverIconUrl = './assets/test-assets/button/icon__add_hover.png';
    this.buttonSettings.clickIconUrl = './assets/test-assets/button/icon__add_click.png';
    this.buttonSettings.disabledIconUrl = './assets/test-assets/button/icon__add_disabled.png';
    this.buttonSettings.state = ButtonState.Default;
  }

  /**
   * Обработка нажатия кнопки
   */
  public buttonClick(): void {
    alert('Кнопка нажата');
  }

  /**
   * Смена типа кнопки и иконок для тестирования
   */
  public changeType(event: any): void {
    switch (event.target.value) {
      case ButtonType.Main:
        this.buttonSettings.textButton = "Кнопка"
        this.buttonSettings.defaultIconUrl = './assets/test-assets/button/icon__add_white.png'
        break;

      case ButtonType.MainTransparent:
      case ButtonType.WithoutBorder:
        this.buttonSettings.textButton = "Кнопка"
        this.buttonSettings.defaultIconUrl = './assets/test-assets/button/icon__add_default.png'
        break;
      
      case ButtonType.Link:
        this.buttonSettings.textButton = "Текст ссылки"
        this.buttonSettings.defaultIconUrl = './assets/test-assets/button/icon__add_default.png'
        break;
    }

    this.buttonSettings.hoverIconUrl = './assets/test-assets/button/icon__add_hover.png';
    this.buttonSettings.clickIconUrl = './assets/test-assets/button/icon__add_click.png';
    this.buttonSettings.disabledIconUrl = './assets/test-assets/button/icon__add_disabled.png';
  }
}