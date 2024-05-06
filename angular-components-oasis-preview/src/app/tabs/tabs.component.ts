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
  /** Настройки для первых вкладок */
  public tabsSettingsFirst: TabsSettings;

  /** Настройки для вторых вкладок */
  public tabsSettingsSecond: TabsSettings;

  /** Расстояние между вкладками на тестовой странице */
  public tabGap: number = 40;

  /** Имитация выбора элемента */
  public onTabSelectEmitter: EventEmitter<[ITabsItemSelectable, boolean, boolean]> = new EventEmitter<[ITabsItemSelectable, boolean, boolean]>();

  /** Список элементов первого компонента */
  public tabsItemsFirst: Array<ITabsItemSelectable> = [
    {
      id: 0,
      display: 'Контент 1',
      disableLeftIcon: false,
      disableRightIcon: true,
      leftIconUrlDefault: './assets/test_assets/icon__add_default.png',
      leftIconUrlHover: './assets/test_assets/icon__add_hover.png',
      leftIconUrlClick: './assets/test_assets/icon__add_click.png',
      leftIconUrlDisabled: './assets/test_assets/icon__add_disabled.png',
      rightIconUrlDefault: './assets/test_assets/icon__copy_default.png',
      rightIconUrlHover: './assets/test_assets/icon__copy_hover.png',
      rightIconUrlClick: './assets/test_assets/icon__copy_click.png',
      rightIconUrlDisabled: './assets/test_assets/icon__copy_disabled.png'
    },
    {
      id: 1,
      display: 'Контент 2',
      leftIconUrlDefault: './assets/test_assets/icon__clear.png',
      leftIconAreaWidth: 140,
      rightIconAreaWidth: 40,
      rightIconUrlDefault: './assets/test_assets/icon__delete.png'
    },
    {
      id: 2,
      display: '',
      leftIconUrlDefault: './assets/test_assets/icon__documents.png',
      leftIconAreaWidth: 70
    }
  ];

  /** Список элементов для второго компонента */
  public tabsItemsSecond: Array<ITabsItemSelectable> = [
    { id: 3, display: 'Контент 4' },
    { id: 4, display: 'Контент 5' },
    { id: 5, display: 'Контент 6' }
  ];

  /** Алиас единицы измерения компонента */
  public TabsUnit = TabsUnit;

  public constructor() {
    this.tabsSettingsFirst = new TabsSettings(this.tabGap);
    this.tabsSettingsSecond = new TabsSettings(this.tabGap);

    this.tabsSettingsFirst.onSetTabSelect = this.onTabSelectEmitter;

    this.tabsSettingsFirst.onTabSelect.subscribe(this.getValue.bind(this));
    this.tabsSettingsSecond.onTabSelect.subscribe(this.getValue.bind(this));

    this.tabsItemsFirst[0].onLeftIconClick = new EventEmitter<any>();
    this.tabsItemsFirst[0].onLeftIconClick.subscribe(this.getLeftIconValueOfFirstTab.bind(this));

    this.tabsItemsFirst[0].onRightIconClick = new EventEmitter<any>();
    this.tabsItemsFirst[0].onRightIconClick.subscribe(this.getRightIconValueOfFirstTab.bind(this));

    this.tabsItemsFirst[1].onLeftIconClick = new EventEmitter<any>();
    this.tabsItemsFirst[1].onLeftIconClick.subscribe(this.getLeftIconValueOfSecondTab.bind(this));

    this.tabsItemsFirst[1].onRightIconClick = new EventEmitter<any>();
    this.tabsItemsFirst[1].onRightIconClick.subscribe(this.getRightIconValueOfSecondTab.bind(this));

    this.tabsItemsFirst[2].onLeftIconClick = new EventEmitter<any>();
    this.tabsItemsFirst[2].onLeftIconClick.subscribe(this.getLeftIconValueOfThirdTab.bind(this));
  }

  /**
   * Клик по левой иконке первой вкладки
   */
  public getLeftIconValueOfFirstTab(): void {
    alert('Add worked');
  }

  /**
   * Клик по правой иконке правой вкладки
   */
  public getRightIconValueOfFirstTab(): void {
    alert('Copy worked');
  }

  /**
   * Клик по левой иконке правой вкладки
   */
  public getLeftIconValueOfSecondTab(): void {
    alert('Clear worked');
  }

  /**
   * Клик по правой иконке второй вкладки
   */
  public getRightIconValueOfSecondTab(): void {
    alert('Delete worked');
  }

  /**
   * Клик по левой иконке третьей вкладки
   */
  public getLeftIconValueOfThirdTab(): void {
    alert('Documents worked');
  }

  /**
   * Установить расстояние между всеми вкладками
   */
  public setGapWidth(event: any): void {
    this.tabsSettingsFirst.gap = event.target.value;
    this.tabsSettingsSecond.gap = event.target.value;
  }

  /**
   * Установка ширины для правой иконки второй вкладки
   */
  public setIconAreaWidth(event: any): void {
    this.tabsItemsFirst[1].rightIconAreaWidth = event.target.value;
  }

  /**
   * Выбор элемента на тестовой странице
   * Включение/отключение вкладок
   */
  public setValue(input: any, disabled: boolean = false): void {
    let item;

    if (input.value < this.tabsItemsFirst.length + 1) {
      item = this.tabsItemsFirst[input.value - 1];
    } else {
      item = this.tabsItemsSecond[input.value - this.tabsItemsFirst.length - 1];
    }

    if (item != null && !disabled) {
      this.onTabSelectEmitter.emit([item, false, false]);
    } else if (item != null && disabled) {
      item.disabled = !item.disabled;
    }
  }

  /**
   * Выбор иконки на тестовой странице
   */
  public setIconValue(input: any): void {
    let item;

    if (input.value < this.tabsItemsFirst.length + 1) {
      item = this.tabsItemsFirst[input.value - 1];
    }
    else if (input.value - this.tabsItemsSecond.length <= this.tabsItemsSecond.length) {
      item = this.tabsItemsSecond[input.value - this.tabsItemsSecond.length - 1];
    }

    if (item != null) {
      this.onTabSelectEmitter.emit([item, true, false]);
    }
  }

  /**
   * Переключение вкладок между двумя компонентами вкладок
   */
  public getValue(item: ITabsItemSelectable): void {
    // TODO: подумать над надобностью метода и тем фактом, что выделяется disable элемент (c) кто-то...
    console.log('Установка', item);

    this.tabsItemsFirst.forEach(item => {
      item.selected = false;
    });

    this.tabsItemsSecond.forEach(item => {
      item.selected = false;
    });

    item.selected = true;
  }

  /**
   * Добавить новую вкладку на тестовую страницу
   */
  public addTabItem(item: any, array: Array<ITabsItemSelectable>): void {
    if (item.value) {
      let newItem: ITabsItemSelectable = {
        id: array.length,
        display: item.value
      }

      array.push(newItem);
    }
  }

  /**
   * Смена ширины компонента
   */
  public changeWidth(event: any): void {
    this.tabsSettingsFirst.width = event.target.value;
    this.tabsSettingsSecond.width = event.target.value;
  }

  /**
   * Смена единицы измерения ширины для компонента
   */
  public changeTypeWidth(event: any): void {
    this.tabsSettingsFirst.widthUnit = event.target.value;
    this.tabsSettingsSecond.widthUnit = event.target.value;
  }

  /**
   * Изменяет значение флага на повторный вызов одинаковых элементов
   */
  public changeRepeatEmit(event: any): void {
    this.tabsSettingsFirst.isNeedRepeatedSelectionEmit = event.target.checked;
  }
}