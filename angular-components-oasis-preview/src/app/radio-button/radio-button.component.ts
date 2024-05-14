import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisRadioButtonComponent, RadioButtonPosition, RadioButtonSettingItem, RadioButtonSize, RadioButtonType, RadioButtonsSettings } from '@oasis/radio-button';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [FormsModule, CommonModule, OasisRadioButtonComponent],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  // Текущие настройки
  public radioButtonsSettings: RadioButtonsSettings;

  /** Алиас размеров */
  public RadioButtonSize = RadioButtonSize;

  /** Алиас позиции */
  public RadioButtonPosition = RadioButtonPosition;

  /** Тип чекбокса */
  public RadioButtonType = RadioButtonType;

  public constructor() {
    this.radioButtonsSettings = new RadioButtonsSettings('Вкусняшки');
    this.radioButtonsSettings.items.push(new RadioButtonSettingItem('Мятные пряники', false));
    this.radioButtonsSettings.items.push(new RadioButtonSettingItem('Лимонные вафли', false));
    this.radioButtonsSettings.items.push(new RadioButtonSettingItem('Сосиска в тесте', false));
    this.radioButtonsSettings.items.push(new RadioButtonSettingItem('Овсяное печенье', false));
  }

  /**
   * Смена выбранного значения радиокнопок
   * @param numberItem номер значения из списка
   */
  public changeChecked(numberItem: number): void {
    this.radioButtonsSettings.selectedValue.emit(this.radioButtonsSettings.items[numberItem]);
  }

  /**
   * Сброс всех значений
   */
  public resetSelectedItem(): void {
    this.radioButtonsSettings.resetSelectedItem();
  }
}