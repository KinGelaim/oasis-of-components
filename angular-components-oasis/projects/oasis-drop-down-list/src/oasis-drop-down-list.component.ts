import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { DropDownItemSettings } from './shared/drop-down-item-settings.class';
import { IDropDownItem } from './shared/drop-down-item.interface';
import { DropDownSettings } from './shared/drop-down-settings.class';
import { DropDownUnit } from './shared/drop-down-unit.enum';

@Component({
  selector: 'oasis-drop-down-list',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-drop-down-list.component.html',
  styleUrl: 'oasis-drop-down-list.component.scss'
})
export class OasisDropDownListComponent implements OnInit, OnDestroy {
  /** Обращение к элементу HTML */
  @ViewChild('dropDown')
  private dropDown!: ElementRef;

  /** Входящие настройки для работы компонента */
  @Input()
  public dropDownSettings!: DropDownSettings;

  /** Входящие настройки текущего компонента */
  @Input()
  public dropDownItemSettings!: DropDownItemSettings;

  /** Метод для связи значения поля с другими компонентами (единичный выбор) */
  @Output()
  public onSelectedItemChange: EventEmitter<IDropDownItem | null> = new EventEmitter<IDropDownItem | null>();

  /** Метод для связи значения поля с другими компонентами (множественный выбор) */
  @Output()
  public onSelectedItemsChange: EventEmitter<IDropDownItem[] | null> = new EventEmitter<IDropDownItem[] | null>();

  /** Передача события focus */
  @Output()
  public onFocus: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события blur */
  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter<any>();

  /** Открытие списка */
  public isOpenedDropDown = false;

  /** Текст подсказки c выбранными значениями */
  public placeholderDisplay!: string;

  /** Цвет placeholder или выбранного элемента */
  public currentColorText!: string;

  /** Алиас единицы измерения компонента */
  public DropDownUnit = DropDownUnit;

  /** Слежка за действиями с мышкой */
  private mouseListener = this.dropDownMouseListener.bind(this);

  /** Подписка на переключение выбранного объекта в компоненте */
  private subscriptionOnChangeValue!: Subscription;

  /** Подписка на смену включенного и выключенного состояния объекта */
  private subscriptionOnChangeDisable!: Subscription;

  /** Подписка на сброс выбранных значений */
  private subscriptionOnClearValues!: Subscription;

  /** Подписка на сброс выбранных значений с обратным вызовом */
  private subscriptionOnClearValuesWithEmit!: Subscription;

  /** Подписка на выключение какого-то элемента в списке */
  private subscriptionOnDisabledElementList!: Subscription;

  public ngOnInit(): void {
    this.subscriptionOnChangeValue = this.dropDownItemSettings.selectedValue
      .subscribe(dropDownItem => this.executeSelected(dropDownItem, this.dropDownItemSettings.isNeedReverseEmit));
    this.subscriptionOnChangeDisable = this.dropDownItemSettings.changeDisabled.subscribe(this.changeDisable.bind(this));
    this.subscriptionOnClearValues = this.dropDownItemSettings.clearSelectedValues.subscribe(this.clearSelectedValues.bind(this));
    this.subscriptionOnClearValuesWithEmit = this.dropDownItemSettings.clearSelectedValuesWithEmit.subscribe(this.clearSelectedValuesWithEmit.bind(this));
    this.subscriptionOnDisabledElementList = this.dropDownSettings.disabledElement.subscribe(this.checkSelectedAll.bind(this));

    this.placeholderDisplay = this.fillingPlaceHolder();
    this.currentColorText = this.setFontColorText();
  }

  public ngOnDestroy(): void {
    this.subscriptionOnChangeValue?.unsubscribe();
    this.subscriptionOnChangeDisable?.unsubscribe();
    this.subscriptionOnClearValues?.unsubscribe();
    this.subscriptionOnDisabledElementList?.unsubscribe();
    this.subscriptionOnClearValuesWithEmit?.unsubscribe();
  }

  /**
   * Выполнения действия при установке фокуса на поле ввода
   */
  public setFocus(event: any): void {
    this.onFocus.emit(event);
  }

  /**
   * Выполнение действия при потере фокуса
   */
  public setBlur(event: any): void {
    this.onBlur.emit(event);
  }

  /**
   * Смена включенного и выключенного состояния для отдельного компонента с перекрашиванием цвета текста
   */
  public changeDisable(): void {
    this.currentColorText = this.setFontColorText();
  }

  /**
   * Переключение между открытием и закрытием выпадающего списка
   * В заблокированном состоянии всегда только закрываем
   */
  public switchingDropDown(): void {
    if (!this.dropDownItemSettings.isDisabled) {
      this.isOpenedDropDown = !this.isOpenedDropDown;

      if (this.isOpenedDropDown) {
        this.dropDownSettings.items.forEach(item => item.backgroundColor = this.dropDownSettings.defaultBackgroundColorItem);
        window.addEventListener('mousedown', this.mouseListener);
      } else {
        window.removeEventListener('mousedown', this.mouseListener);
      }
      return;
    }

    if (this.isOpenedDropDown) {
      this.isOpenedDropDown = false;
      window.removeEventListener('mousedown', this.mouseListener);
    }
  }

  /**
   * Выбор значения при клике по строке с данными
   */
  public choiceSelectedItem(item: IDropDownItem): void {
    if (item.disabled) {
      return;
    }

    if (this.dropDownItemSettings.isDisabled) {
      this.switchingDropDown();
      return;
    }

    this.executeSelected(item, true);
  }

  /**
   * Выполнение действий при выборе значения
   * @param item значение, которое необходимо изменить
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSelected(item: IDropDownItem, isNeedReverseEmit: boolean): void {
    if (this.dropDownSettings.isMultiSelectable) {
      this.executeMultiSelected(item, isNeedReverseEmit);
      return;
    }

    this.executeSingleSelected(item, isNeedReverseEmit);
  }

  /**
   * Выполнение действий при единичном выборе
   * Сброс всех значений, выбор нового, замена наименования и передача в проект
   * @param item значение, которое необходимо выбрать
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSingleSelected(item: IDropDownItem, isNeedReverseEmit: boolean): void {
    if (this.isOpenedDropDown) {
      this.switchingDropDown();
    }

    if (!this.dropDownItemSettings.isNeedRepeatedSelectionEmit
      && this.dropDownItemSettings.selectedItems.includes(item)) {
      return;
    }

    this.dropDownItemSettings.selectedItems = [];

    if (item != null) {
      this.dropDownItemSettings.selectedItems.push(item);
    }

    this.placeholderDisplay = this.fillingPlaceHolder();
    this.currentColorText = this.setFontColorText();

    if (isNeedReverseEmit) {
      this.onSelectedItemChange.emit(item);
    }
  }

  /**
   * Выполнение действий при множественном выборе
   * @param item значение, которое необходимо изменить
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeMultiSelected(item: IDropDownItem, isNeedReverseEmit: boolean): void {
    let findCurrentSelected = this.dropDownItemSettings.selectedItems.find(selectedItem => selectedItem == item) ?? null;

    // Если пункт выбрать все
    if (item == this.dropDownSettings.selectedAllElement) {
      this.executeSelectedAll(findCurrentSelected, isNeedReverseEmit);
      return;
    }

    // Если элемент добавляем
    if (this.dropDownItemSettings.selectedItems.length == 0 || findCurrentSelected == null) {
      this.dropDownItemSettings.selectedItems.push(item);
      this.checkChooseSelectedAll();
      this.executeSelectedElement(isNeedReverseEmit);
      return;
    }

    // Если элемент удаляем
    this.dropDownItemSettings.selectedItems = this.dropDownItemSettings.selectedItems.filter(item => item.value != findCurrentSelected?.value);

    // Выключаем выбрать все, так как одно уже не выбрано
    this.dropDownItemSettings.selectedItems = this.dropDownItemSettings.selectedItems
      .filter(selectedItem => selectedItem != this.dropDownSettings.selectedAllElement);

    this.executeSelectedElement(isNeedReverseEmit);
  }

  /**
   * Обработки кнопки выбрать все
   * Либо сбрасываем все значения, кроме заблокированных, либо все включаем кроме заблокированных
   * @param findCurrentSelected найденный элемент
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSelectedAll(findCurrentSelected: IDropDownItem | null, isNeedReverseEmit: boolean): void {
    this.dropDownItemSettings.selectedItems = this.dropDownItemSettings.selectedItems.filter(item => item.disabled);
    if (findCurrentSelected == null) {
      this.dropDownSettings.items.forEach(item => {
        if (!item.disabled) {
          this.dropDownItemSettings.selectedItems.push(item);
        }
      });
    }

    this.executeSelectedElement(isNeedReverseEmit);
  }

  /**
   * Выполнение действий при выборе элементов
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSelectedElement(isNeedReverseEmit: boolean): void {
    this.placeholderDisplay = this.fillingPlaceHolder();
    this.currentColorText = this.setFontColorText();

    // После выбора значения сбрасываем
    if (isNeedReverseEmit) {
      let sendItems = this.dropDownItemSettings.selectedItems.filter(item => item != this.dropDownSettings.selectedAllElement);
      this.onSelectedItemsChange.emit(sendItems);
    }
  }

  /**
   * Проверка всех выпадающих списков на необходимость отключении кнопки "Выбрать все"
   * * Если кнопка "Выбрать все" горит и включается элемент, который не включен, то кнопку вырубаем
   * * Если кнопка "Выбрать все" не горит и мы выключаем элемент, который не включен. то кнопку врубаем
   */
  private checkSelectedAll(item: IDropDownItem): void {
    let haveSelectedAll = this.dropDownItemSettings.selectedItems.find(item => item == this.dropDownSettings.selectedAllElement);

    // Случаи, когда ничего проверять не надо
    if (haveSelectedAll && item.disabled || !haveSelectedAll && !item.disabled) {
      return;
    }

    this.checkChooseSelectedAll();
  }

  /**
   * Проверяем надо ли включать кнопку "Включить все"
   * * Проверяем все элементы, кроме выключенных и "Выбрать все", так как он есть в списке
   */
  private checkChooseSelectedAll(): void {
    let countSelectedElements = this.dropDownItemSettings.selectedItems
      .filter(item => !item.disabled && item != this.dropDownSettings.selectedAllElement).length;
    let countCanSelectedElements = this.dropDownSettings.items
      .filter(item => !item.disabled && item != this.dropDownSettings.selectedAllElement).length;

    if (countSelectedElements == countCanSelectedElements) {
      this.dropDownItemSettings.selectedItems.push(this.dropDownSettings.selectedAllElement);
      return;
    }

    this.dropDownItemSettings.selectedItems = this.dropDownItemSettings.selectedItems.filter(item => item != this.dropDownSettings.selectedAllElement);
  }

  /**
   * Закрытие выпадающего списка при клике вне поля
   * @param event событие
   */
  private dropDownMouseListener(event: any): void {
    if (!this.dropDown.nativeElement.contains(event.target)) {
      this.switchingDropDown();
    }
  }

  /**
   * Складывает наименования для вывода, если доступен множественный выбор
   * @returns выводимый текст
   */
  private fillingPlaceHolder(): string {
    let selectedItems = this.dropDownItemSettings.selectedItems;

    switch (selectedItems.length) {
      case 0:
        return this.dropDownSettings.placeholder;
      case 1:
        return selectedItems[0].display;
      default:
        return selectedItems.filter(item => item != this.dropDownSettings.selectedAllElement).map(item => {
          return item.display;
        }).join(', ');
    }
  }

  /**
   * Проверка на наличие в выбранных объектах
   */
  public checkInclude(item: IDropDownItem): boolean {
    if (this.dropDownItemSettings.selectedItems.length == 0) {
      return false;
    }

    // У множественного выбора должно быть наличие в массиве
    if (this.dropDownSettings.isMultiSelectable && this.dropDownItemSettings.selectedItems.includes(item)) {
      return true;
    }

    // У единичного только одно значение может быть
    if (this.dropDownItemSettings.selectedItems[0] == item) {
      return true;
    }
    return false;
  }

  /**
   * Установка цвета заднего фона для одиночного списка
   * @param item элемент
   * @returns цвета фона
   */
  public setBackgroundColorSingle(item: IDropDownItem): string | null {
    if (this.dropDownSettings.isMultiSelectable) {
      return this.dropDownSettings.defaultBackgroundColorItem;
    }

    return this.checkInclude(item) ? this.dropDownSettings.selectedBackgroundColorItem : item.backgroundColor ?? null;
  }

  /**
   * Установка цвета заднего фона для множественного списка
   * @param item элемент
   * @returns цвета фона
   */
  public setBackgroundColorMulti(item: IDropDownItem): string | null {
    return this.checkInclude(item) || item.disabled ? null : item.backgroundColor ?? null;
  }

  /**
   * Установка цвета текста
   * @returns цвет текста
   */
  private setFontColorText(): string {
    if (this.dropDownSettings.placeholder == this.placeholderDisplay) {
      return this.dropDownSettings.disableFontColorItem;
    }

    return this.dropDownItemSettings.isDisabled ? this.dropDownSettings.disabledFontColor : this.dropDownSettings.fontColor;
  }

  /**
  * Меняем цвет у указанного элемента
  * @param item элемент для смены цвета
  * @param isDefaultColor применяется ли стандартный цвет
  */
  public changeColorMouse(item: IDropDownItem, isDefaultColor: boolean = false): void {
    if (this.checkInclude(item) || item.disabled) {
      return;
    }

    item.backgroundColor = isDefaultColor ? this.dropDownSettings.defaultBackgroundColorItem : this.dropDownSettings.backgroundColor;
  }

  /**
   * Очищает выбранные значения у компонента без обратного вызова
   */
  private clearSelectedValues(allClear: boolean): void {
    this.dropDownItemSettings.selectedItems = allClear ? [] : this.dropDownItemSettings.selectedItems.filter(item => item.disabled);
    this.placeholderDisplay = this.fillingPlaceHolder();
    this.currentColorText = this.setFontColorText();
  }

  /**
   * Очищает выбранные значения у компонента с обратным вызовом
   */
  private clearSelectedValuesWithEmit(allClear: boolean): void {
    this.clearSelectedValues(allClear);

    if (this.dropDownSettings.isMultiSelectable) {
      let send = this.dropDownItemSettings.selectedItems.length == 0 ? null : this.dropDownItemSettings.selectedItems;
      this.onSelectedItemsChange.emit(send);
      return;
    }

    this.onSelectedItemChange.emit(null);
  }
}