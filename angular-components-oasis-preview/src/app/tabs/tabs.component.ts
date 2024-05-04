import { Component, EventEmitter } from '@angular/core';
import { OasisTabsComponent, TabsSettings, ITabsItemSelectable, TabsUnit } from '@oasis/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [OasisTabsComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  public tabsSettingsFirst: TabsSettings;

  public tabsSettingsSecond: TabsSettings;

  public tabGap: number = 40;

  public onTabSelectEmitter: EventEmitter<ITabsItemSelectable> = new EventEmitter<ITabsItemSelectable>();

  public tabsItemsFirst: ITabsItemSelectable[] = [
    { id: 1, display: 'Контент 1' },
    { id: 2, display: 'Контент 2', disabled: true },
    { id: 3, display: 'Контент 3' }
  ];

  public tabsItemsSecond: ITabsItemSelectable[] = [
    { id: 4, display: 'Контент 4' },
    { id: 5, display: 'Контент 5' },
    { id: 6, display: 'Контент 6', disabled: true }
  ];

  public TabsUnit = TabsUnit;

  public constructor() {
    this.tabsSettingsFirst = new TabsSettings(this.tabGap);
    this.tabsSettingsFirst.isNeedRepeatedSelectionEmit = true;
    
    this.tabsSettingsSecond = new TabsSettings(this.tabGap);
    this.tabsSettingsSecond.isNeedRepeatedSelectionEmit = true;

    this.tabsSettingsFirst.onSetTabSelect = this.onTabSelectEmitter;

    this.tabsSettingsFirst.onTabSelect.subscribe(this.getValue.bind(this));
    this.tabsSettingsSecond.onTabSelect.subscribe(this.getValue.bind(this));
  }

  public setGapWidth(value: any): void {
    this.tabsSettingsFirst.gap = value.target.value;
    this.tabsSettingsSecond.gap = value.target.value;
  }

  public setValue(input: any, disabled: boolean = false): void {
    let item;

    if (input.value < this.tabsItemsFirst.length + 1) {
      item = this.tabsItemsFirst[input.value - 1];
    } else {
      item = this.tabsItemsSecond[input.value - this.tabsItemsFirst.length - 1];
    }

    if (item != null && !disabled) {
      this.onTabSelectEmitter.emit(item);
    } else if (item != null && disabled) {
      item.disabled = !item.disabled;
    }
  }

  public getValue(item: ITabsItemSelectable): void {
    console.log('Установка', item);

    if (item.disabled) {
      return;
    }

    this.tabsItemsFirst.forEach(item => item.selected = false);
    this.tabsItemsSecond.forEach(item => item.selected = false);

    item.selected = true;
  }
}
