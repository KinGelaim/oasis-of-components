import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisTextInputComponent, TextInputIconPosition, TextInputRegularExpression, TextInputRegularExpressionExecute, TextInputSettings, TextInputSize, TextInputTextAlign, TextInputType, TextInputUnit } from '@oasis/text-input';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FormsModule, OasisTextInputComponent],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  /** Текущие настройки */
  public textInputSettings: TextInputSettings;

  /** Алиас размеров поля ввода */
  public TextInputSize = TextInputSize;

  /** Алиас типа поля ввода */
  public TextInputType = TextInputType;

  /** Алиас расположения иконки в поле ввода */
  public TextInputIconPosition = TextInputIconPosition;

  /** Алиас способа применения регулярного выражения */
  public TextInputRegularExpressionExecute = TextInputRegularExpressionExecute;

  /** Алиас типовых регулярных выражений */
  public TextInputRegularExpression = TextInputRegularExpression;

  /** Алиас расположения текста */
  public TextInputTextAlign = TextInputTextAlign;

  /** Алиас единицы измерения компонента */
  public TextInputUnit = TextInputUnit;

  /** Тестовые данные о текущем состоянии фокуса */
  public isFocus: boolean = false;

  /** Код последней активной нажатой клавиши */
  public lastActionKeyCode: string = '';

  public constructor() {
    this.textInputSettings = new TextInputSettings();
    this.textInputSettings.minCharacters = 3;
    this.textInputSettings.maxCharacters = 10;
    this.textInputSettings.placeholder = 'Подсказка';
    this.textInputSettings.iconUrl = './assets/test_assets/magnifying_glass.svg';
    this.textInputSettings.textAlign = TextInputTextAlign.Center;
  }

  /**
   * Изменение значения поля ввода
   */
  public setValue(value: any): void {
    this.textInputSettings.setValue(value.target.value, false);
  }

  /**
   * Изменение фокуса
   */
  public setFocus(value: boolean): void {
    this.isFocus = value;
  }

  /**
   * Изменение значения последней активной нажатой клавиши
   */
  public setLastActionKeyCode(event: any): void {
    this.lastActionKeyCode = event.code;
  }

  /**
   * Изменение типа поля ввода с валидацией
   */
  public setType(event: any): void {
    this.textInputSettings.setType(event.target.value, true);
  }

  /**
   * Изменение типа поля ввода для просмотра стилей рамки
   */
  public setTypeTestView(event: any): void {
    this.textInputSettings.setType(event.target.value, false);
  }

/**
 * Установка своего регулярного выражения
 * @param event событие с данными
 */
  public setRegular(event: any): void {
    this.textInputSettings.regularExpression = event.target.value;
  }
}