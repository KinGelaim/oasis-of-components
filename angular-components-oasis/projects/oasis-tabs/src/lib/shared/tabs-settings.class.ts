import { EventEmitter } from "@angular/core";

import { ITabsItemSelectable } from "./tabs-item-selectable.interface";
import { TabsUnit } from "./tabs-unit.enum";

export class TabsSettings {
  public onTabSelect: EventEmitter<ITabsItemSelectable>;

  public onSetTabSelect: EventEmitter<ITabsItemSelectable>;

  public constructor(
    public gap: number = 40,
    public width: number | null = null,
    public widthUnit: TabsUnit = TabsUnit.None,
    public isNeedRepeatedSelectionEmit: boolean = false
  ) {
    this.onTabSelect = new EventEmitter<ITabsItemSelectable>();
    this.onSetTabSelect = new EventEmitter<ITabsItemSelectable>();
  }
}