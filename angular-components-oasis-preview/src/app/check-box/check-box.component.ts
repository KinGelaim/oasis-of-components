import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxPosition, CheckBoxSettings, CheckBoxSize, CheckBoxType, OasisCheckBoxComponent } from '@oasis/check-box';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [FormsModule, OasisCheckBoxComponent],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss'
})
export class CheckBoxComponent {
  // Текущие настройки
  public checkBoxSettingsFirst!: CheckBoxSettings;
  public checkBoxSettingsSecond!: CheckBoxSettings;

  /** Алиас размеров */
  public CheckBoxSize = CheckBoxSize;

  /** Алиас позиции */
  public CheckBoxPosition = CheckBoxPosition;

  /** Тип чекбокса */
  public CheckBoxType = CheckBoxType;

  public constructor() {
    this.checkBoxSettingsFirst = new CheckBoxSettings('Test');
    this.checkBoxSettingsSecond = new CheckBoxSettings('Test');
    this.checkBoxSettingsFirst.label = 'Тестовое значение';
    this.checkBoxSettingsSecond.label = 'Тестовое значение';
  }

  /**
   * Установка значений размера чекбоксов
   */
  public setSize(): void {
    this.checkBoxSettingsSecond.size = this.checkBoxSettingsFirst.size;
  }

  /**
   * Установка значений размера чекбоксов
   */
  public setPosition(): void {
    this.checkBoxSettingsSecond.position = this.checkBoxSettingsFirst.position;
  }

  /**
   * Установка значений размера чекбоксов
   */
  public setType(): void {
    this.checkBoxSettingsSecond.type = this.checkBoxSettingsFirst.type;
  }
}