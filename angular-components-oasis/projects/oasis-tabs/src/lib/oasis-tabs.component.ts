import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TabsSettings } from './shared/tabs-settings.class';
import { ITabsItemSelectable } from './shared/tabs-item-selectable.interface';
import { TabsUnit } from './shared/tabs-unit.enum';

@Component({
  selector: 'oasis-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oasis-tabs.component.html',
  styleUrl: './oasis-tabs.component.scss'
})
export class OasisTabsComponent implements OnInit, OnDestroy {
  /** Ссылка на элемент для прокрутки */
  @ViewChild('tabsBlock')
  private tabsBlock!: ElementRef;

  /** Основные настройки для Вкладок */
  @Input()
  public tabsSettings!: TabsSettings;

  /** Список Вкладок */
  @Input()
  public items!: ITabsItemSelectable[];

  /** Подписка на смену вкладки из вне компонента */
  public subscriptionSelectTabs: Subscription | null = null;

  /** Алиас на единицу ширины компонента */
  public TabsWidth = TabsUnit;

  /** Прошлое выбранное значение */
  private oldSelectedTab: ITabsItemSelectable | null = null;

  public ngOnInit(): void {
    this.checkItemsForSelected();

    this.subscriptionSelectTabs = this.tabsSettings.onSetTabSelect.subscribe(this.selectItem.bind(this));
  }

  public ngOnDestroy(): void {
    this.subscriptionSelectTabs?.unsubscribe();
  }

  /**
   * Установка заднего фона для иконок
   */
  public setBackground(element: any, item: ITabsItemSelectable, action: 'click' | 'hover' | 'default', isLeftIcon: boolean): void {
    if (isLeftIcon && item.disableLeftIcon || !isLeftIcon && item.rightIconUrlDisabled) {
      return;
    }

    let iconUrl = isLeftIcon ? item.leftIconUrlDefault : item.rightIconUrlDefault;
    switch (action) {
      case 'click':
        iconUrl = isLeftIcon ? item.leftIconUrlClick ?? iconUrl : item.rightIconUrlClick ?? iconUrl;
        break;
      case 'hover':
        iconUrl = isLeftIcon ? item.leftIconUrlHover ?? iconUrl : item.rightIconUrlHover ?? iconUrl;
        break;
      case 'default':
        break;
    }
    element.style.backgroundImage = `url(${iconUrl})`;
  }

  /**
   * Перемещение прокрутки при клике по элементу
   */
  public scrollToWholeTabOnClick(event: any): void {
    event.target.closest('.tab__item').scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }

  /**
   * Горизонтальное перемещение прокрутки у компонента вкладки
   */
  public scrollTabs(event: any): void {
    this.tabsBlock.nativeElement.scrollLeft += event.deltaY;
  }

  /**
   * Выходит ли контент за ширину элемента
   */
  private isOverflown(element: any): boolean {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  /**
   * Добавление/удаление прокрутки для вкладок
   */
  public listenerOnHover(addListener: boolean): void {
    if (addListener && this.isOverflown(this.tabsBlock.nativeElement)) {
      window.addEventListener('wheel', this.preventScroll, { passive: false });
      return;
    }

    if (!addListener && this.isOverflown(this.tabsBlock.nativeElement)) {
      window.removeEventListener('wheel', this.preventScroll);
    }
  }

  /**
   * Выбор элемента
   */
  public selectItem(ItemTuple: [item: ITabsItemSelectable, leftIconSelected: boolean, rightIconSelected: boolean]): void {
    if (!ItemTuple[0].disabled) {
      this.unselectItems();
      ItemTuple[0].selected = true;
    }

    if (this.tabsSettings.isNeedRepeatedSelectionEmit || this.oldSelectedTab != ItemTuple[0]) {
      this.tabsSettings.onTabSelect.emit(ItemTuple[0]);
    }

    this.oldSelectedTab = ItemTuple[0];
    
    if (ItemTuple[1] && !ItemTuple[0].disableLeftIcon) {
      this.iconFunctionLeft(ItemTuple[0]);
    }

    if (ItemTuple[2] && !ItemTuple[0].disableRightIcon) {
      this.iconFunctionRight(ItemTuple[0]);
    }
  }

  /**
   * Клик по левой иконке
   */
  public iconFunctionLeft(item: ITabsItemSelectable): void {
    item.onLeftIconClick?.emit(item);
  }

  /**
   * Клик по правой иконке
   */
  public iconFunctionRight(item: ITabsItemSelectable): void {
    item.onRightIconClick?.emit(item);
  }

  /**
   * Прерывание прокрутки, при наведении на компонент
   */
  private preventScroll(e: any): boolean {
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  /**
   * Отключает все элементы
   */
  private unselectItems(): void {
    this.items.forEach(item => {
      item.selected = false;
    });
  }

  /**
   * Передача наружу элементов, которые сейчас активированы
   */
  private checkItemsForSelected(): void {
    this.items.forEach(item => {
      if (item.selected) {
        this.tabsSettings.onTabSelect.emit(item);
      }
    });
  }
}