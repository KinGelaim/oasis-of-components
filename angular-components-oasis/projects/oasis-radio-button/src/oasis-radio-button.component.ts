import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { RadioButtonsSettings } from './shared/radio-buttons-settings.class';
import { RadioButtonType } from './shared/radio-button-type.enum';
import { RadioButtonSettingItem } from './shared/radio-button-setting-item.class';

@Component({
  selector: 'oasis-radio-button',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-radio-button.component.html',
  styleUrl: 'oasis-radio-button.component.html'
})
export class OasisRadioButtonComponent implements OnInit, OnDestroy {
  /** Входящие настройки для работы компонента */
  @Input()
  public radioButtonsSettings!: RadioButtonsSettings;

  /** Входящий номер объекта из списка радиокнопок */
  @Input()
  public numberItem!: number;

  /** Передача выбранного значения */
  @Output()
  public onItemChange: EventEmitter<RadioButtonSettingItem> = new EventEmitter<RadioButtonSettingItem>();

  /** Алиас типа радиокнопки */
  public RadioButtonType = RadioButtonType

  /** Подписка на переключение выбранного объекта в компоненте */
  private subscriptionOnChangeValue!: Subscription;

  /** Текущий полученный объект радиокнопок */
  public currentItem!: RadioButtonSettingItem;

  public ngOnInit(): void {
    this.currentItem = this.radioButtonsSettings.items[this.numberItem];
    this.subscriptionOnChangeValue = this.radioButtonsSettings.selectedValue.subscribe(this.changeSelectedItem.bind(this));
  }

  public ngOnDestroy(): void {
    if (this.subscriptionOnChangeValue) {
      this.subscriptionOnChangeValue.unsubscribe();
    }
  }

  /**
   * Передача выбранного пункта из списка радиокнопок и установка статуса выбранного объекта
   */
  public changeSelectedItem(selectedItem: RadioButtonSettingItem): void {
    this.radioButtonsSettings.resetSelectedItem();

    selectedItem.checkedState = true;
    this.onItemChange.emit(this.currentItem);
  }
}