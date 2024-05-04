import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TabsSettings } from './shared/tabs-settings.class';
import { ITabsItemSelectable } from './shared/tabs-item-selectable.interface';
import { TabsUnit } from './shared/tabs-unit.enum';

@Component({
  selector: 'oasis-tabs',
  standalone: true,
  imports: [],
  templateUrl: './oasis-tabs.component.html',
  styleUrl: './oasis-tabs.component.scss'
})
export class OasisTabsComponent implements OnInit, OnDestroy {
  @ViewChild('tabsBlock')
  private tabsBlock!: ElementRef;

  @Input()
  public tabsSettings!: TabsSettings;

  @Input()
  public items!: ITabsItemSelectable[];

  public subscriptionSelectTabs: Subscription | null = null;

  public TabsUnit = TabsUnit;

  private oldSelectedTab: ITabsItemSelectable | null = null;

  public ngOnInit(): void {
    this.checkItemsForSelected();

    this.subscriptionSelectTabs = this.tabsSettings.onSetTabSelect.subscribe(this.selectItem.bind(this));
  }

  public ngOnDestroy(): void {
    this.subscriptionSelectTabs?.unsubscribe();
  }

  public scrollToWholeTabOnClick(event: any): void {
    event.target.closest('.tab__item').scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }

  public scrollTabs(event: any): void {
    this.tabsBlock.nativeElement.scrollLeft += event.deltaY;
  }

  private isOverflow(element: any): boolean {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  public listenerOnHover(addListener: boolean): void {
    if (addListener && this.isOverflow(this.tabsBlock.nativeElement)) {
      window.addEventListener('wheel', this.preventScroll, { passive: false });
      return;
    }

    if (!addListener && this.isOverflow(this.tabsBlock.nativeElement)) {
      window.removeEventListener('wheel', this.preventScroll);
    }
  }

  public selectItem(item: ITabsItemSelectable): void {
    if (!item.disabled) {
      this.unselectItems();
      item.selected = true;
    }

    if (this.tabsSettings.isNeedRepeatedSelectionEmit || this.oldSelectedTab != item) {
      this.tabsSettings.onTabSelect.emit(item);
    }

    this.oldSelectedTab = item;
  }

  private preventScroll(event: any): boolean {
    event.preventDefault();
    event.stopPropagation();

    return false;
  }

  private unselectItems(): void {
    this.items.forEach(item => item.selected = false);
  }

  private checkItemsForSelected(): void {
    this.items.forEach(item => {
      if (item.selected) {
        this.tabsSettings.onTabSelect.emit(item);
      }
    })
  }
}