import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { SwitcherItemStatus } from './shared/switcher-item-status.enum';
import { SwitcherItem } from './shared/switcher-item.class';
import { SwitcherSettings } from './shared/switcher-settings.class';
import { SwitcherUnit } from './shared/switcher-unit.enum';

@Component({
  selector: 'oasis-switcher',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-switcher.component.html',
  styleUrl: 'oasis-switcher.component.scss'
})
export class OasisSwitcherComponent implements OnInit, OnDestroy {
  /** Входящие настройки для работы компонента */
  @Input()
  public switcherSettings!: SwitcherSettings;

  /** Передача выбранного значения */
  @Output()
  public onItemChange: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события наведения курсора на объект */
  @Output()
  public onMouseEnterItem: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события о снятии наведения курсора с объекта */
  @Output()
  public onMouseLeaveItem: EventEmitter<any> = new EventEmitter<any>();

  /** Алиас единицы измерения компонента */
  public SwitcherUnit = SwitcherUnit;

  /** Подписка на переключение выбранного объекта в компоненте */
  private subscriptionOnChangeValue: Subscription | null = null;

  /** Прошлое выбранное значение */
  private oldSelectedItem: SwitcherItem | null = null;

  public ngOnInit(): void {
    this.subscriptionOnChangeValue = this.switcherSettings.selectedValue.subscribe(this.changeSelectedItem.bind(this));
  }

  public ngOnDestroy(): void {
    if (this.subscriptionOnChangeValue) {
      this.subscriptionOnChangeValue.unsubscribe();
    }
  }

  /**
   * Передача выбранного пункта переключателя и установка статуса выбранного объекта
   * Нельзя выбирать выключенные значения
   * @param selectedItem выбранный объект
   */
  public changeSelectedItem(selectedItem: SwitcherItem): void {
    if (selectedItem.status == SwitcherItemStatus.Disable) {
      return;
    }

    if (!this.switcherSettings.isNeedRepeatedSelectionEmit && this.oldSelectedItem == selectedItem) {
      return;
    }

    this.oldSelectedItem = selectedItem;

    this.switcherSettings.values.forEach(item => {
      if (item.status != SwitcherItemStatus.Disable) {
        item.status = SwitcherItemStatus.Normal;
      }
    });

    selectedItem.status = SwitcherItemStatus.Selected;
    this.onItemChange.emit(selectedItem);
  }

  /**
   * Передача информации о наведении на объект переключателя курсора мыши
   * @param selectedItem наводимый объект
   */
  public mouseEnter(selectedItem: SwitcherItem): void {
    this.onMouseEnterItem.emit(selectedItem);
  }

  /**
   * Передача информации о снятии наведения на объект переключателя курсора мыши
   * @param selectedItem наводимый объект
   */
  public mouseLeave(selectedItem: SwitcherItem): void {
    this.onMouseLeaveItem.emit(selectedItem);
  }
}
