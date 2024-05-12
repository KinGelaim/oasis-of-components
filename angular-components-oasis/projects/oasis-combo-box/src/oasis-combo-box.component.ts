import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { EnumHelper } from './helpers/enum-helper.class';
import { ComboBoxItemSettings } from './shared/combo-box-item-settings.class';
import { IComboBoxItem } from './shared/combo-box-item.interface';
import { ComboBoxResultProcessing } from './shared/combo-box-result-processing.enum';
import { ComboBoxSearchType } from './shared/combo-box-search-type.enum';
import { ComboBoxSettings } from './shared/combo-box-settings.class';
import { ComboBoxType } from './shared/combo-box-type.enum';
import { ComboBoxUnit } from './shared/combo-box-unit.enum';

@Component({
  selector: 'oasis-combo-box',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-combo-box.component.html',
  styleUrl: 'oasis-combo-box.component.scss'
})
export class OasisComboBoxComponent implements OnInit, OnDestroy {
  /** Входящие настройки для работы компонента */
  @Input()
  public comboBoxSettings!: ComboBoxSettings;

  /** Входящие настройки текущего компонента */
  @Input()
  public comboBoxItemSettings!: ComboBoxItemSettings;

  /** Метод для передачи вводимого значения */
  @Output()
  public onInputChange: EventEmitter<any> = new EventEmitter<any>();

  /** Передача события blur */
  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter<any>();

  /** Метод для связи значения поля с другими компонентами (единичный выбор) */
  @Output()
  public onSelectedItemChange: EventEmitter<IComboBoxItem | null> = new EventEmitter<IComboBoxItem | null>();

  /** Метод для связи значения поля с другими компонентами (множественный выбор) */
  @Output()
  public onSelectedItemsChange: EventEmitter<IComboBoxItem[] | null> = new EventEmitter<IComboBoxItem[] | null>();

  /** Обращение к элементу HTML всего компонента*/
  @ViewChild('comboBox')
  private comboBox!: ElementRef;

  /** Обращение к элементу HTML поле ввода*/
  @ViewChild('comboBoxInput')
  private comboBoxInput!: ElementRef;

  /** Обращение к элементу HTML выпадающий список */
  @ViewChild('comboBoxList')
  private comboBoxList!: ElementRef;

  /** Алиас типов комбобокса*/
  public ComboBoxType = ComboBoxType;

  /** Открытие списка */
  public isOpenedComboBox: boolean = false;

  /** Надо ли переворачивать список у компонента */
  public isReverseList: boolean = false;

  /** Является ли список поиска пустым */
  public isFilterListEmpty: boolean = false;

  /** Слежка за действиями с мышкой */
  private mouseListener = this.comboBoxMouseListener.bind(this);

  /** Текст подсказки c выбранными значениями */
  public inputFieldValue: string = '';

  /** Были ли применена фильтрация списка, обнуляется после создания списка для стрелочек */
  private isListFiltered: boolean = true;

  /** Список объектов для вывода */
  public filteredItems!: IComboBoxItem[];

  /** Алиас единицы измерения компонента */
  public ComboBoxUnit = ComboBoxUnit;

  /** Список элементов для работы со стрелочками */
  private comboBoxListItems: HTMLElement[] = [];

  /** Текущий объект, у которого стоит наведение */
  private currentHoverArrow: IComboBoxItem | null = null;

  /** Подписка на переключение выбранного объекта в компоненте */
  private subscriptionOnChangeValue!: Subscription;

  /** Подписка на сброс выбранных значений */
  private subscriptionOnClearValuesWithoutEmit!: Subscription;

  /** Подписка на сброс выбранных значений с обратным вызовом */
  private subscriptionOnClearValuesWithEmit!: Subscription;

  /** Прошлый выбранный элемент (для восстановления при потери фокуса в соответствующем режиме) */
  private oldSelectedItems: IComboBoxItem[] = [];

  /** Выбранные значения записанные в placeholder */
  public selectedItemsPlaceholder: string = '';

  /** Таймер задержки для отслеживания события blur */
  private blurTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

  /** Количество элементов в выпадающем списке */
  private countItems: number = 0;

  /** Получить значение цвета выбранного элемента */
  public get selectedFontColor(): string {
    return this.comboBoxItemSettings.type != ComboBoxType.Disabled
      ? (this.comboBoxSettings.isMultiSelectable ? null : this.comboBoxItemSettings.selectedItems[0]?.color)
      ?? this.comboBoxItemSettings.fontColor
      ?? this.comboBoxSettings.fontColor
      ?? this.comboBoxSettings.defaultFontColor
      : this.comboBoxSettings.disabledFontColor
  }

  public ngOnInit(): void {
    this.subscriptionOnChangeValue = this.comboBoxItemSettings.selectedValue.subscribe(value => {
      this.executeSelected(value, this.comboBoxItemSettings.isNeedReverseEmit);
    });

    this.subscriptionOnClearValuesWithoutEmit = this.comboBoxItemSettings.clearSelectedValuesWithoutEmit.subscribe(this.clearSelectedValues.bind(this));
    this.subscriptionOnClearValuesWithEmit = this.comboBoxItemSettings.clearSelectedValuesWithEmit.subscribe(this.clearSelectedValuesWithEmit.bind(this));

    let selectedItems = this.comboBoxItemSettings.selectedItems;
    if (selectedItems.length > 0) {
      if (!this.comboBoxSettings.isMultiSelectable) {
        setTimeout(() => {
          this.executeSingleSelected(selectedItems[0], true);
        });
      } else {
        setTimeout(() => {
          this.executeSelectedElements(true);
        });
      }
    }

    this.countItems = this.comboBoxSettings.items
      .filter(item => item.visible != false
        && !item.disabled
        && item != this.comboBoxSettings.selectedAllElement
      ).length;
  }

  public ngOnDestroy(): void {
    this.subscriptionOnChangeValue?.unsubscribe();
    this.subscriptionOnClearValuesWithoutEmit?.unsubscribe();
    this.subscriptionOnClearValuesWithEmit?.unsubscribe();
  }

  /**
   * Создание списка для вывода
   * @param filterInputValue указывает надо ли дополнительно фильтровать по полю ввода
   * @param focusElement необходимость установки фокуса элемента
   */
  private createVisibleList(filterInputValue: boolean, focusElement: boolean): void {
    this.calculateDropDownPosition();

    let isPresentEmpty: boolean = false;
    let filterList = this.comboBoxSettings.items.filter(item => {
      if (item.value == null) {
        isPresentEmpty = true;
      }

      if (item.visible != false || this.comboBoxItemSettings.selectedItems.includes(item)) {
        if (filterInputValue) {
          // Ищем любое вхождение
          if (this.comboBoxSettings.searchType == ComboBoxSearchType.Include) {
            return item.display.toLowerCase().includes(this.inputFieldValue.toLowerCase());
          }

          // Ищем с самого начала
          if (this.comboBoxSettings.searchType == ComboBoxSearchType.SearchFromBeginning) {
            return item.display.toLowerCase().startsWith(this.inputFieldValue.toLowerCase());
          }

          return false;
        }

        return true;
      }

      return false;
    });

    // Добавляем пустое значение, если его нет, а должно быть. Только для поля без мультивыбора
    if (!this.comboBoxSettings.isMultiSelectable && !isPresentEmpty && this.comboBoxSettings.isAddedEmptyValue) {
      let emptyObject = {
        value: null,
        display: '',
        visible: true
      };

      // Если стоит всегда добавлять пустое значение
      if (this.comboBoxSettings.isAlwaysDisplayEmptyValue) {
        filterList.unshift(emptyObject);
      } else {
        // Если выбрано значение
        if (this.comboBoxItemSettings?.selectedItems[0]?.value != null) {
          filterList.unshift(emptyObject);
        }
      }
    }

    // Если количество элементов изменилось от первоначального количества, то проверить надо ли снять галочку включить все
    if (this.comboBoxSettings.isMultiSelectable && this.comboBoxSettings.items
      .filter(item => item.visible != false && !item.disabled && item != this.comboBoxSettings.selectedAllElement).length != this.countItems) {
      this.countItems = this.comboBoxSettings.items.length;
      this.checkChooseSelectedAll();
    }

    this.filteredItems = filterList.filter(item => item != this.comboBoxSettings.selectedAllElement || this.inputFieldValue == '');

    /**
     * Назначаем фокус на выбранный элемент и добавляем класс
     * TODO: Так как не успевает появится div после создания списка для вывода, пока хранится в setTimeout
     */
    setTimeout(() => {
      this.handlingDocument(false, true);

      if (focusElement && this.comboBoxItemSettings.selectedItems.length > 0) {
        this.filteredItems.forEach(element => {
          if (this.comboBoxItemSettings.selectedItems.includes(element)) {
            let index = this.filteredItems.findIndex(item => item == element);
            if (index != -1 && this.comboBoxListItems[index] != undefined) {
              this.comboBoxListItems[index].classList.add('keyboard-selector');
              this.comboBoxSettings.isMultiSelectable ? this.comboBoxListItems[0].focus() : this.comboBoxListItems[index].focus();
              this.comboBoxInput.nativeElement.focus();
              this.currentHoverArrow = element;
            }
          }
        });
      }
    });

    if (!focusElement) {
      this.currentHoverArrow = null;
    }
  }

  /**
   *  Вызов выпадающего списка при клике на картинку треугольника
   */
  public switchingComboBoxClickImage(): void {
    if (this.isOpenedComboBox) {
      this.isOpenedComboBox = false;
      window.removeEventListener('mousedown', this.mouseListener);
    } else {
      this.switchingComboBox();
    }
  }

  /**
   * Переключение между открытием и закрытием
   * В заблокированном состоянии всегда только закрываем
   */
  public switchingComboBox(statusOpenList: boolean = true): void {
    if (this.comboBoxItemSettings.type == ComboBoxType.Disabled) {
      this.isOpenedComboBox = false;
      window.removeEventListener('mousedown', this.mouseListener);
      return;
    }

    this.isOpenedComboBox = statusOpenList;

    // Назначаем фокус, если открытие выпадающего списка было через стрелочку
    if (this.comboBoxInput.nativeElement != document.activeElement) {
      this.comboBoxInput.nativeElement.focus();
    }

    if (this.isOpenedComboBox) {
      if (!this.isFilterListEmpty) {
        this.createVisibleList(this.comboBoxSettings.isMultiSelectable ? true : this.comboBoxItemSettings.selectedItems.length == 0, true);
      }

      window.addEventListener('mousedown', this.mouseListener);

      // Если в поле есть текст и есть что-то в поиске, то убирать красную рамку
      if (this.inputFieldValue.length != 0 && this.filteredItems.length != 0) {
        this.comboBoxItemSettings.type = ComboBoxType.Normal;
      }
    } else {
      this.checkValidateValue();
      this.handlingDocument(true, false);
      window.removeEventListener('mousedown', this.mouseListener);
    }
  }

  /**
   * Проверка поля ввода на валидность и очистка при необходимости
   */
  private checkValidateValue(isSkipReplacement: boolean = false): void {
    if (this.inputFieldValue.length > 0 && (this.comboBoxItemSettings.selectedItems.length == 0 || this.comboBoxSettings.isMultiSelectable)) {
      let findItem = this.filteredItems.find(item => item.display.length == this.inputFieldValue.length);

      // Если есть найденное значение, выбрать элемент
      if (findItem != null) {
        this.executeSelected(findItem, true);
        return;
      }

      // Если выбрано стирать значение
      if (this.checkClearingValue() && !(this.checkReplacementPrevious() && this.oldSelectedItems.length > 0)) {
        this.clearSelectedValuesWithEmit(true);
        return;
      }

      // Замена на предыдущее значение
      if (this.checkReplacementPrevious() && !isSkipReplacement) {
        if (this.oldSelectedItems.length > 0) {
          if (!this.comboBoxSettings.isMultiSelectable) {
            this.choiceSelectedItem(this.oldSelectedItems[0], true);
          } else {
            this.onSelectedItemsChange.emit(this.oldSelectedItems);
            this.onInputChange.emit(this.selectedItemsPlaceholder);
            this.comboBoxItemSettings.type = ComboBoxType.Normal;
            this.setFontColorText();
            this.isFilterListEmpty = false;
            this.inputFieldValue = '';
          }
        } else {
          this.checkValidateValue(true);
        }
        return;
      }

      if (this.checkHighlightingColor()) {
        this.comboBoxItemSettings.type = ComboBoxType.Error;
      }

      return;
    }

    if (this.checkReplacementPrevious() && !isSkipReplacement) {
      if (this.oldSelectedItems.length > 0 && !this.oldSelectedItems.some(item => this.comboBoxItemSettings.selectedItems.includes(item))) {
        if (!this.comboBoxSettings.isMultiSelectable) {
          this.choiceSelectedItem(this.oldSelectedItems[0], true);
        } else {
          this.onSelectedItemsChange.emit(this.oldSelectedItems);
          this.onInputChange.emit(this.selectedItemsPlaceholder);
          this.comboBoxItemSettings.type = ComboBoxType.Normal;
          this.setFontColorText();
          this.isFilterListEmpty = false;
          this.inputFieldValue = '';
        }
      } else {
        this.checkValidateValue(true);
      }
      return;
    }

    if (this.inputFieldValue.length == 0 && this.comboBoxSettings.isMultiSelectable) {
      this.onInputChange.emit(this.selectedItemsPlaceholder);
    }
  }

  /**
   * Закрытие выпадающего списка при клике вне поля
   * @param event событие
   */
  private comboBoxMouseListener(event: any): void {
    if (!this.comboBox.nativeElement.contains(event.target)) {
      this.switchingComboBox(false);
    }
  }

  /**
   * Выбор значения при клике по строке с данными
   * При пустом и выключенном списке ничего выбрать нельзя
   * @param selectedItem элемент, который нужно выбрать
   * @param isNeedReverseEmit нужен ли обратный вызов после установки значения
   */
  public choiceSelectedItem(item: IComboBoxItem, isNeedReverseEmit: boolean): void {
    this.comboBoxInput.nativeElement.focus();

    if (item.disabled) {
      return;
    }

    this.executeSelected(item, isNeedReverseEmit);

    if (this.isOpenedComboBox && !this.comboBoxSettings.isMultiSelectable) {
      this.switchingComboBox(false);
    }
  }

  /**
   * Меняем цвет у указанного элемента
   * @param item элемент для смены цвета
   * @param isDefaultColor применяется ли стандартный цвет
   */
  private changeColor(item: IComboBoxItem, isDefaultColor: boolean = false): void {
    item.backgroundColor = isDefaultColor
      ? this.comboBoxSettings.defaultBackgroundColorItem
      : (this.comboBoxSettings.backgroundColor ?? this.comboBoxSettings.defaultBackgroundColor);
  }

  /**
   * Меняем цвет у указанного элемент при событии мышкой
   * @param item элемент для выделения
   * @param isDefaultColor применяется ли стандартный цвет
   * @param event событие мышкой
   */
  public changeColorMouse(item: IComboBoxItem, isDefaultColor: boolean = false, event: any): void {
    this.createArrowListAfterFilter();

    let oldFocusElement = event.target?.parentElement.querySelector('.keyboard-selector');

    // Если ранее не был выбран элемент и было наведение, то просто выделяем его
    if (oldFocusElement == null && !isDefaultColor) {
      event.target.classList.add('keyboard-selector');
      item.backgroundColor = this.comboBoxSettings.backgroundColor ?? this.comboBoxSettings.defaultBackgroundColor;
      this.currentHoverArrow = item;
      return;
    }

    // Если выбран тот же элемент
    if (oldFocusElement != null && oldFocusElement == event.target) {

      // Очищаем если было событие mouseleave, иначе ничего не делаем
      if (!isDefaultColor) {
        return;
      }

      oldFocusElement.classList.remove('keyboard-selector');
      item.backgroundColor = this.comboBoxSettings.defaultBackgroundColorItem;
    }

    // Если ранее был выбран другой элемент, то его очищаем и назначаем новый, возможно только при mouseenter
    if (oldFocusElement != null && oldFocusElement != event.target) {
      this.comboBoxSettings.items.forEach(item => {
        item.backgroundColor = this.comboBoxSettings.defaultBackgroundColorItem;
      });
      oldFocusElement.classList.remove('keyboard-selector');

      event.target.classList.add('keyboard-selector');
      item.backgroundColor = this.comboBoxSettings.backgroundColor ?? this.comboBoxSettings.defaultBackgroundColor;
      this.currentHoverArrow = item;
    }
  }

  /**
   * Создание списка элементов, когда было изменение из-за фильтрации
   * Так же один раз запускается при первом выборе значения из списка, либо мышкой, либо клавишами
   */
  private createArrowListAfterFilter(): void {
    if (!this.isListFiltered) {
      return;
    }

    this.isListFiltered = false;
    this.handlingDocument(true, false);
  }

  /**
   * Вертикальное перемещение фокуса по элементам выпадающего списка
   * @param event событие отработки клавиши
   * @param focusElement элемент у которого сейчас фокус
   * @param focusArray массив элементов доступных для фокуса
   */
  private changeFocusElement(event: KeyboardEvent, focusElement: Element | null, focusArray: HTMLElement[]): void {
    for (let i = 0; i < focusArray.length; i++) {
      if (focusElement != focusArray[i]) {
        continue;
      }

      if (event.key === 'ArrowUp' && i - 1 >= 0) {
        this.changeSelectedItem(focusElement, i, true, focusArray);
      } else if (event.key === 'ArrowDown' && i + 1 < focusArray.length) {
        this.changeSelectedItem(focusElement, i, false, focusArray);
      }
      break;
    }
  }

  /**
   * Нажатие кнопок в поле ввода
   * @param event событие
   */
  public onKeyUpInput(event: any): void {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
      if (this.isOpenedComboBox) {
        this.executeSetValue(event);
      } else {
        this.switchingComboBox(true);
      }
      return;
    }

    if (event.code == "ArrowUp" || event.code == "ArrowDown") {
      if (this.isOpenedComboBox && !this.isFilterListEmpty) {
        this.movingArrow(event);
      } else {
        this.switchingComboBox(true);
      }
      return;
    }

    if (event.code == 'Escape') {
      this.switchingComboBox(false);
    }
  }

  /**
   * Нажатие кнопок в поле ввода
   * @param event событие
   */
  public onKeyDownInput(event: any): void {
    if (event.code == "Tab") {
      this.switchingComboBox(false);
    }
  }

  /**
   * Выход из поля ввода
   * Необходимо для обработки сценария, когда после выбора значения, зажимает backspace и выходим из поля мышкой
   * @param event событие
   */
  public blurInputWithTimeout(event: any): void {
    clearTimeout(this.blurTimeout);

    this.blurTimeout = setTimeout(() => {
      if (this.comboBoxInput.nativeElement != document.activeElement) {
        this.blurInput(event);
      }
    }, 200);
  }

  /**
   * Выход из поля ввода, для мультикомбобокса отмеченные значения не сбрасываем
   * @param event событие
   */
  public blurInput(event: any): void {
    let isNotEmptyArray = this.comboBoxItemSettings.selectedItems.length > 0;
    let isNotSelectedItem = this.comboBoxItemSettings.selectedItems.some(item => item.display != this.inputFieldValue);

    if (this.inputFieldValue != '' && isNotEmptyArray && isNotSelectedItem) {
      if (this.checkClearingValue() && !(this.checkReplacementPrevious() && this.oldSelectedItems.length > 0)) {
        this.clearInput();
      } else {
        if (!this.comboBoxSettings.isMultiSelectable) {
          this.comboBoxItemSettings.selectedItems = [];
          this.oldSelectedItems = [];
          this.onSelectedItemChange.emit(null);
          this.onInputChange.emit('');
        } else {
          this.onInputChange.emit(event.target.value);
        }

        if (this.inputFieldValue != '' && this.checkHighlightingColor()) {
          this.comboBoxItemSettings.type = ComboBoxType.Error;
        }
      }
    }
    this.onBlur.emit(event);
  }

  /**
   * Выполнение действий при подтверждении выбора значения
   * Подтвердить можно либо первое в списке, либо выбранное из списка по стрелочкам
   * @param event событие
   */
  private executeSetValue(event: any): void {
    if (this.filteredItems.length >= 1 && !this.currentHoverArrow?.disabled) {
      let focusElement = event.target.parentElement?.parentElement?.querySelector('.keyboard-selector');

      // Если какой-то элемент выбран из выпадающего списка, то выбираем его
      if (focusElement != null && this.currentHoverArrow != null) {
        this.executeSelected(this.currentHoverArrow, true);
        this.comboBoxInput.nativeElement.focus();
      } else {
        this.executeSelected(this.filteredItems[0], true);
      }
    } else if (this.checkClearingValue()
      && !(this.checkReplacementPrevious() && this.oldSelectedItems.length > 0)) {
      this.clearInput();
    }

    if (!this.comboBoxSettings.isMultiSelectable && !this.currentHoverArrow?.disabled) {
      this.switchingComboBox(false);
    }
  }

  /**
   * Назначение и передача объекта, обнуление списка поиска
   * @param selectedItem элемент, который нужно выбрать
   * @param isNeedReverseEmit нужен ли обратный вызов после установки значения
   */
  private executeSingleSelected(selectedItem: IComboBoxItem | null, isNeedReverseEmit: boolean): void {
    this.inputFieldValue = selectedItem?.display ?? '';
    this.isFilterListEmpty = false;
    this.comboBoxItemSettings.type = ComboBoxType.Normal;

    let skipEmit = false;
    // Сравниваем значения, чтобы проверять ещё и null, так как он создается каждый раз
    let equalValue = this.oldSelectedItems[0]?.value == selectedItem?.value && this.oldSelectedItems[0]?.value == this.comboBoxItemSettings.selectedItems[0]?.value;
    if (!this.comboBoxItemSettings.isNeedRepeatedSelectionEmit && equalValue) {
      skipEmit = true;
    }

    this.oldSelectedItems = [];
    this.comboBoxItemSettings.selectedItems = [];

    if (selectedItem != null) {
      this.comboBoxItemSettings.selectedItems.push(selectedItem);
      this.oldSelectedItems.push(selectedItem);
    }

    if (!isNeedReverseEmit || skipEmit) {
      return;
    }

    this.onSelectedItemChange.emit(selectedItem);
    this.onInputChange.emit(selectedItem?.display ?? '');
  }

  /**
   * Выполнение действий при множественном выборе
   * @param item значение, которое необходимо изменить
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeMultiSelected(item: IComboBoxItem, isNeedReverseEmit: boolean): void {
    let findCurrentSelected = this.comboBoxItemSettings.selectedItems.find(selectedItem => selectedItem == item) ?? null;

    // Если пункт выбрать все
    if (item == this.comboBoxSettings.selectedAllElement) {
      this.executeSelectedAll(findCurrentSelected, isNeedReverseEmit);
      return;
    }

    // Если элемент добавляем
    if (this.comboBoxItemSettings.selectedItems.length == 0 || findCurrentSelected == null) {
      this.comboBoxItemSettings.selectedItems.unshift(item);
      this.checkChooseSelectedAll();
      this.executeSelectedElements(isNeedReverseEmit);
      return;
    }

    // Если элемент удаляем
    this.comboBoxItemSettings.selectedItems = this.comboBoxItemSettings.selectedItems.filter(item => item.value != findCurrentSelected?.value);

    // Выключаем выбрать все, так как одно уже не выбрано
    this.comboBoxItemSettings.selectedItems = this.comboBoxItemSettings.selectedItems
      .filter(selectedItem => selectedItem != this.comboBoxSettings.selectedAllElement);

    this.executeSelectedElements(isNeedReverseEmit);
  }

  /**
   * Очистка поля ввода, обнуление списка поиска
   */
  private clearInput(): void {
    this.inputFieldValue = '';
    this.onInputChange.emit('');
    this.isFilterListEmpty = false;
    this.comboBoxItemSettings.type = ComboBoxType.Normal;
  }

  /**
   * Фильтрация списка значений по вводимым значениям
   * Удалять выбранный элемент только при полной очистке поля
   */
  public filterItems(event: any): void {
    this.createVisibleList(true, false);

    if (this.filteredItems.filter(item => item.value != null).length == 0) {
      if (this.checkHighlightingColor()) {
        this.comboBoxItemSettings.type = ComboBoxType.Error;
      }
      this.filteredItems = this.filteredItems.filter(item => item.value != null);
      this.isFilterListEmpty = true;
    } else {
      this.comboBoxItemSettings.type = ComboBoxType.Normal;
      this.isFilterListEmpty = false;
    }

    this.isListFiltered = true;

    // Если есть какое-то выбранное значение и мы меняем его в строке ввода, то его сбрасываем и передаем в основной компонент
    let currentSelected = this.comboBoxItemSettings.selectedItems[0];
    if (!this.comboBoxSettings.isMultiSelectable && currentSelected != null && currentSelected?.display != this.inputFieldValue) {
      this.comboBoxItemSettings.selectedItems = [];
      this.onSelectedItemChange.emit(null);
      this.onInputChange.emit('');
    } else {
      this.selectedItemsPlaceholder = this.fillingPlaceHolder();
      this.setFontColorText();
    }

    if (!this.isOpenedComboBox) {
      this.switchingComboBox(true);
    }

    this.createArrowListAfterFilter();

    this.onInputChange.emit(event.target.value);
  }

  //#region ClassForArrow

  /**
   * Выполнение действий при включении работы по стрелочкам в списке выбора
   * Выбираем первый элемент списка или выбираем следующий или предыдущий
   * @param event событие
   */
  private movingArrow(event: any): void {
    let focusElement = event.target.parentElement?.parentElement?.querySelector('.keyboard-selector');
    if (focusElement == null) {
      this.comboBoxListItems[0].classList.add('keyboard-selector');
      this.comboBoxListItems[0].focus();
      this.comboBoxInput.nativeElement.focus();
      this.changeColor(this.filteredItems[0]);
    } else {
      this.changeFocusElement(event, focusElement, this.comboBoxListItems);
    }
  }

  /**
   * Переключение к следующему или предыдущему элементу
   * Возвращаем фокус на поле ввода при каждом переключении
   * @param focusElement элемент у которого сейчас фокус
   * @param currentIndex текущий номер из списка
   * @param isDirectionUp указывает направление, в которое происходит перемещение по списку (вверх или вниз)
   * @param focusArray массив элементов доступных для фокуса
   */
  private changeSelectedItem(focusElement: Element | null, currentIndex: number, isDirectionUp: boolean, focusArray: HTMLElement[]): void {
    let nextElementIndex = isDirectionUp ? currentIndex - 1 : currentIndex + 1;

    focusElement?.classList.remove('keyboard-selector');
    focusArray[nextElementIndex].classList.add('keyboard-selector');

    focusArray[nextElementIndex].focus();
    this.comboBoxInput.nativeElement.focus();

    this.changeColor(this.filteredItems[nextElementIndex]);
    this.changeColor(this.filteredItems[currentIndex], true);

    this.currentHoverArrow = this.filteredItems[nextElementIndex];
  }

  /**
   * Обработка документа
   * @param deleteClass необходимо ли удалять класс
   * @param pushElement необходимо ли добавлять объект в список HTML
   */
  private handlingDocument(deleteClass: boolean, pushElement: boolean): void {
    if (pushElement && this.comboBoxListItems.length > 0) {
      this.comboBoxListItems = [];
    }

    let elements = document.activeElement?.parentElement?.parentElement?.querySelectorAll('.combo-box-list__item');
    elements?.forEach((element) => {
      if (pushElement) {
        this.comboBoxListItems.push(element as HTMLElement);
      }
      if (deleteClass) {
        element.classList.remove('keyboard-selector');
      }
    });

    if (deleteClass) {
      this.filteredItems.forEach(element => {
        this.changeColor(element, true);
      });
    }
  }

  //#endregion ClassForArrow


  //#region ResultProcessing

  /** Проверка наличия флага на выделение цветом */
  private checkHighlightingColor(): boolean {
    return EnumHelper.checkResultProcessing(this.comboBoxSettings.resultProcessing, ComboBoxResultProcessing.HighlightingColor);
  }

  /** Проверка наличия флага на очистку значения */
  private checkClearingValue(): boolean {
    return EnumHelper.checkResultProcessing(this.comboBoxSettings.resultProcessing, ComboBoxResultProcessing.ClearingValue);
  }

  /** Проверка наличия флага на замену значения */
  private checkReplacementPrevious(): boolean {
    return EnumHelper.checkResultProcessing(this.comboBoxSettings.resultProcessing, ComboBoxResultProcessing.ReplacementPrevious);
  }

  //#endregion ResultProcessing

  /**
   * Рассчитывает положение выпадающего списка
   */
  private calculateDropDownPosition(): void {
    if (!this.comboBoxSettings.isNeedReverseOpening) {
      this.isReverseList = false;
      return;
    }

    let comboBoxElement = this.comboBox.nativeElement;
    let dropDownElement = this.comboBoxList.nativeElement;
    
    // * Необходимо, чтобы рассчитать высоту элемента, которого ещё нет на странице
    dropDownElement.style.opacity = 0;

    setTimeout(() => {
      let comboBoxRect = comboBoxElement.getBoundingClientRect();
      let stylesDropDownElement = window.getComputedStyle(dropDownElement);
      let height = parseFloat(stylesDropDownElement.height);
      
      if (isNaN(height)) {
        height = parseFloat(stylesDropDownElement.maxHeight);
      }

      let distanceFromBottomScreen = window.innerHeight - comboBoxRect.bottom;

      let isPossibleReverse = window.innerHeight >= distanceFromBottomScreen + height;
      let isNeedReverse = distanceFromBottomScreen < height;

      this.isReverseList = isPossibleReverse && isNeedReverse;

      // Возвращаем видимость элемента
      dropDownElement.style.opacity = 1;
    });
  }

  /**
   * Проверка на наличие в выбранных объектах
   * @param item элемент
   */
  public checkInclude(item: IComboBoxItem): boolean {
    if (this.comboBoxItemSettings.selectedItems.length == 0) {
      return false;
    }

    // У множественного выбора должно быть наличие в массиве
    if (this.comboBoxSettings.isMultiSelectable && this.comboBoxItemSettings.selectedItems.includes(item)) {
      return true;
    }

    // У единичного только одно значение может быть
    if (this.comboBoxItemSettings.selectedItems[0] == item) {
      return true;
    }
    return false;
  }

  /**
   * Очищает выбранные значения у компонента без обратного вызова
   * @param allClear необходим ли очистить все значения
   */
  private clearSelectedValues(allClear: boolean): void {
    this.comboBoxItemSettings.selectedItems = allClear ? [] : this.comboBoxItemSettings.selectedItems.filter(item => item.disabled);
    this.selectedItemsPlaceholder = this.fillingPlaceHolder();
    this.oldSelectedItems = [];
    this.setFontColorText();
    this.clearInput();
  }

  /**
   * Очищает выбранные значения у компонента с обратным вызовом
   * @param allClear необходим ли очистить все значения
   */
  private clearSelectedValuesWithEmit(allClear: boolean): void {
    this.clearSelectedValues(allClear);

    if (this.comboBoxSettings.isMultiSelectable) {
      let send = this.comboBoxItemSettings.selectedItems.length == 0 ? null : this.comboBoxItemSettings.selectedItems;
      this.onSelectedItemsChange.emit(send);
      this.setFontColorText();
      return;
    }

    this.onSelectedItemChange.emit(null);
  }

  /**
   * Складывает наименования для вывода, если доступен множественный выбор
   * @returns выводимый текст
   */
  private fillingPlaceHolder(): string {
    let selectedItems = this.comboBoxItemSettings.selectedItems.filter(item => item.value !== null);

    switch (selectedItems.length) {
      case 0:
        return '';

      case 1:
        return selectedItems[0].display;

      default:
        return selectedItems.filter(item => item != this.comboBoxSettings.selectedAllElement).map(item => {
          return item.display;
        }).join(', ');
    }
  }

  /**
   * Установка цвета текста
   */
  private setFontColorText(): void {
    this.modifyClassBasedOnSelection(this.selectedItemsPlaceholder != null);
  }

  /**
   * Добавить/удалить класс placeholder-selected в зависимости от выбранного значения
   */
  private modifyClassBasedOnSelection(isNeedReverseEmit: boolean): void {
    setTimeout(() => {
      if (!isNeedReverseEmit || this.comboBoxItemSettings.selectedItems.length == 0 && isNeedReverseEmit) {
        this.comboBoxInput.nativeElement.classList.remove('placeholder-selected');
      } else {
        this.comboBoxInput.nativeElement.classList.add('placeholder-selected');
      }
    });
  }

  /**
   * Выполнение действий при выборе значения
   * @param item значение, которое необходимо изменить
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSelected(item: IComboBoxItem, isNeedReverseEmit: boolean): void {
    if (this.comboBoxSettings.isMultiSelectable) {
      this.executeMultiSelected(item, isNeedReverseEmit);
      return;
    }

    this.executeSingleSelected(item, isNeedReverseEmit);
  }

  /**
   * Проверяем надо ли включать кнопку "Включить все"
   * Проверяем все элементы, кроме выключенных и "Выбрать все", так как он есть в списке
   */
  private checkChooseSelectedAll(): void {
    let countSelectedElements = this.comboBoxItemSettings.selectedItems
      .filter(item => !item.disabled && item != this.comboBoxSettings.selectedAllElement).length;
    let countCanSelectedElements = this.comboBoxSettings.items
      .filter(item => item.visible != false && !item.disabled && item != this.comboBoxSettings.selectedAllElement).length;

    if (countSelectedElements == countCanSelectedElements) {
      this.comboBoxItemSettings.selectedItems.push(this.comboBoxSettings.selectedAllElement);
      return;
    }

    this.comboBoxItemSettings.selectedItems = this.comboBoxItemSettings.selectedItems.filter(item => item != this.comboBoxSettings.selectedAllElement);
  }

  /**
   * Обработки кнопки выбрать все
   * Либо сбрасываем все значения, кроме заблокированных, либо все включаем кроме заблокированных
   * @param findCurrentSelected найденный элемент
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSelectedAll(findCurrentSelected: IComboBoxItem | null, isNeedReverseEmit: boolean): void {
    this.comboBoxItemSettings.selectedItems = this.comboBoxItemSettings.selectedItems.filter(item => item.disabled && item.visible != false);
    
    if (findCurrentSelected == null) {
      this.comboBoxSettings.items.forEach(item => {
        if (!item.disabled && item.visible != false) {
          this.comboBoxItemSettings.selectedItems.push(item);
        }
      });
    }

    this.executeSelectedElements(isNeedReverseEmit);
  }

  /**
   * Выполнение действий при выборе элементов
   * @param isNeedReverseEmit необходим ли обратный вызов после изменения значения
   */
  private executeSelectedElements(isNeedReverseEmit: boolean): void {
    let sendItems = this.comboBoxItemSettings.selectedItems.filter(item => item != this.comboBoxSettings.selectedAllElement);

    this.oldSelectedItems = [];

    sendItems.forEach(item => {
      if (!this.oldSelectedItems.includes(item)) {
        this.oldSelectedItems.push(item);
      }
    });

    this.selectedItemsPlaceholder = this.fillingPlaceHolder();
    this.inputFieldValue = '';
    this.setFontColorText();

    // После выбора значения сбрасываем
    if (isNeedReverseEmit) {
      this.onSelectedItemsChange.emit(sendItems);
      this.onInputChange.emit(this.selectedItemsPlaceholder);
    }
  }
}