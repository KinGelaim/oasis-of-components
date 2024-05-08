import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonExpandSettings, ButtonExpandSize, ButtonExpandState, ButtonExpandUnit, OasisButtonExpandComponent } from '@oasis/button-expand';

// TODO: убрать FormsModule
@Component({
  selector: 'app-button-expand',
  standalone: true,
  imports: [FormsModule, OasisButtonExpandComponent],
  templateUrl: './button-expand.component.html',
  styleUrl: './button-expand.component.scss'
})
export class ButtonExpandComponent {
  /** Текущие настройки */
  public buttonExpandSettings!: ButtonExpandSettings;

  /** Алиас статуса кнопки */
  public ButtonExpandState = ButtonExpandState;

  /** Алиас размера кнопки (только для раздвигающейся) */
  public ButtonExpandSize = ButtonExpandSize;

  /** Алиас единиц измерения компонента */
  public ButtonExpandUnit = ButtonExpandUnit;

  /** Открытие компонента влево */
  public isLeftChecked: boolean = true;

  public constructor() {
    this.buttonExpandSettings = new ButtonExpandSettings();
    this.buttonExpandSettings.textButton = 'Текст кнопки';
    this.buttonExpandSettings.size = ButtonExpandSize.Large;

    // Задаем картинки и меняем статус, чтобы назначить картинку
    this.buttonExpandSettings.defaultIconUrl = './assets/test-assets/button-expand/plus_white.png';
    this.buttonExpandSettings.disabledIconUrl = './assets/test-assets/button-expand/plus_gray.png';
    this.buttonExpandSettings.state = ButtonExpandState.Default;
  }

  /**
   * Обработка нажатия кнопки
   */
  public buttonClick(): void {
    alert('Кнопка нажата');
  }

  /**
   * Сменить выравнивание компонента
   */
  public changeAlign(): void {
    this.isLeftChecked = !this.isLeftChecked;
  }
}