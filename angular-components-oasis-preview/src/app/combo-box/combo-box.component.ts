import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboBoxItemSettings, ComboBoxResultProcessing, ComboBoxSearchType, ComboBoxSettings, ComboBoxSize, ComboBoxType, ComboBoxUnit, IComboBoxItem, OasisComboBoxComponent } from '@oasis/combo-box';

@Component({
  selector: 'app-combo-box',
  standalone: true,
  imports: [FormsModule, OasisComboBoxComponent],
  templateUrl: './combo-box.component.html',
  styleUrl: './combo-box.component.scss'
})
export class ComboBoxComponent {
  /** Текущие настройки */
  public comboBoxSettingsFirst: ComboBoxSettings;
  public comboBoxSettingsSecond: ComboBoxSettings;

  /** Алиас размера компонента */
  public ComboBoxSize = ComboBoxSize;

  /** Алиас типа компонента */
  public ComboBoxType = ComboBoxType;

  /** Алиас типа измерения ширины подсказки */
  public ComboBoxUnit = ComboBoxUnit;

  /** Алиас обработки неверного значения при потери фокуса */
  public ComboBoxResultProcessing = ComboBoxResultProcessing;

  /** Основной режим для обработки результирующего значения */
  public mainMode = ComboBoxResultProcessing.None;

  /** Дополнительный режим для обработки результирующего значения */
  public additionalMode = ComboBoxResultProcessing.None;

  /** Алиас типа поиска в комбобоксе */
  public ComboBoxSearchType = ComboBoxSearchType;

  /** Основной режим для обработки результирующего значения */
  public searchType = ComboBoxSearchType.Include;

  /** Общее количество компонентов */
  public allCountComponents = 2;

  // Текущие выбранные элементы
  public viewValueFirst: string = '';
  public viewValueSecond: string = '';

  /** Количество раз потери фокуса */
  public blurCount: number = 0;
  public blurCountSecond: number = 0;

  /** Вводимое значение в поле ввода */
  public currentInputValue: string = '';
  public currentInputValueSecond: string = '';

  /** Красный цвет */
  private readonly RED = '#ff0000';

  /** Исходное значение для margin-bottom */
  public marginBottomValue: number = 0;

  /** Обновлять значение marginBottomValue */
  private isUpdateMarginValue: boolean = false;

  /** Список значений для заполнения */
  private arrayForComboBox = [
    { id: 0, content: 'Свердловская область' },
    { id: 1, content: 'Тверская область' },
    { id: 2, content: 'Челябинская область' },
    { id: 3, content: 'Московская область' },
    { id: 4, content: 'Иркутская область' },
    { id: 5, content: 'Смоленская область' },
    { id: 6, content: 'Ярославская область' },
    { id: 7, content: 'Республика Коми' },
    { id: 8, content: 'Республика Татарстан' },
    { id: 9, content: 'Чеченская республика' },
    { id: 10, content: 'Мишляндия' },
    { id: 11, content: 'ТестовоеНаименованиеБезПробеловДляИзбавленияОтСкролла' }
  ];

  /** Преобразованный список для передачи в компонент */
  public comboBoxItems: Array<IComboBoxItem> = [
    { value: this.arrayForComboBox[0], display: this.arrayForComboBox[0].content },
    { value: this.arrayForComboBox[1], display: this.arrayForComboBox[1].content },
    { value: this.arrayForComboBox[2], display: this.arrayForComboBox[2].content },
    { value: this.arrayForComboBox[3], display: this.arrayForComboBox[3].content, color: this.RED },
    { value: this.arrayForComboBox[4], display: this.arrayForComboBox[4].content },
    { value: this.arrayForComboBox[5], display: this.arrayForComboBox[5].content },
    { value: this.arrayForComboBox[6], display: this.arrayForComboBox[6].content },
    { value: this.arrayForComboBox[7], display: this.arrayForComboBox[7].content },
    { value: this.arrayForComboBox[8], display: this.arrayForComboBox[8].content },
    { value: this.arrayForComboBox[9], display: this.arrayForComboBox[9].content },
    { value: this.arrayForComboBox[10], display: this.arrayForComboBox[10].content, visible: false },
    { value: this.arrayForComboBox[11], display: this.arrayForComboBox[11].content }
  ];

  public comboBoxItemsSecond: Array<IComboBoxItem> = [
    { value: this.arrayForComboBox[0], display: this.arrayForComboBox[0].content },
    { value: this.arrayForComboBox[1], display: this.arrayForComboBox[1].content },
    { value: this.arrayForComboBox[2], display: this.arrayForComboBox[2].content },
    { value: this.arrayForComboBox[3], display: this.arrayForComboBox[3].content, color: this.RED },
    { value: this.arrayForComboBox[4], display: this.arrayForComboBox[4].content },
    { value: this.arrayForComboBox[5], display: this.arrayForComboBox[5].content },
    { value: this.arrayForComboBox[6], display: this.arrayForComboBox[6].content },
    { value: this.arrayForComboBox[7], display: this.arrayForComboBox[7].content },
    { value: this.arrayForComboBox[8], display: this.arrayForComboBox[8].content },
    { value: this.arrayForComboBox[9], display: this.arrayForComboBox[9].content },
    { value: this.arrayForComboBox[10], display: this.arrayForComboBox[10].content, visible: false },
    { value: this.arrayForComboBox[11], display: this.arrayForComboBox[11].content }
  ];

  public constructor() {
    this.comboBoxSettingsFirst = new ComboBoxSettings();
    this.comboBoxSettingsSecond = new ComboBoxSettings();

    this.comboBoxSettingsSecond.isMultiSelectable = true;

    this.comboBoxSettingsFirst.items = this.comboBoxItems;
    this.comboBoxSettingsSecond.items = this.comboBoxItemsSecond;

    // Заполнение настроек для каждого компонента
    for (let i = 0; i < this.allCountComponents; i++) {
      if (i == 1) {
        this.comboBoxSettingsFirst.itemsSettings.push(
          new ComboBoxItemSettings(ComboBoxType.Normal, [this.comboBoxItems[1]], null, null, true)
        );
      } else {
        this.comboBoxSettingsSecond.itemsSettings.push(
          new ComboBoxItemSettings(ComboBoxType.Normal, [this.comboBoxItemsSecond[2], this.comboBoxItemsSecond[3], this.comboBoxItemsSecond[5]], null, null, true)
        );
      }
    }

    // Выставляем для всех настроек режим обратного вызова
    this.comboBoxSettingsFirst.itemsSettings.forEach(itemSettings => itemSettings.isNeedReverseEmit = true);
    this.comboBoxSettingsSecond.itemsSettings.forEach(itemSettings => itemSettings.isNeedReverseEmit = true);
  }

  /**
   * Изменяет значение флага на повторный вызов одинаковых элементов
   */
  public changeRepeatEmit(event: any): void {
    this.comboBoxSettingsFirst.itemsSettings.forEach(el => el.isNeedRepeatedSelectionEmit = event.target.checked);
    this.comboBoxSettingsSecond.itemsSettings.forEach(el => el.isNeedRepeatedSelectionEmit = event.target.checked);
  }

  /**
   * Тестовый выбор элементов, кроме скрытых и заблокированных элементов
   */
  public selectElements(): void {
    const filteredComboBoxItems = this.comboBoxItems.filter(item => item.visible != false && item.disabled == false || item.visible != false && item.disabled == null);
    const filteredComboBoxItemsSecond = this.comboBoxItemsSecond.filter(item => item.visible != false && item.disabled == false || item.visible != false && item.disabled == null);

    let random = Math.floor(Math.random() * (this.comboBoxItems.length - 1));

    this.comboBoxSettingsFirst.itemsSettings[0].selectedValue.emit(filteredComboBoxItems[random]);
    this.comboBoxSettingsSecond.itemsSettings[0].selectedValue.emit(filteredComboBoxItemsSecond[random]);
  }

  /**
   * Тестовый выбор первого элемента без обратной связи, кроме скрытых и заблокированных элементов
   */
  public selectElementWithoutEmit(): void {
    const filteredComboBoxItems = this.comboBoxItems.filter(item => item.visible != false && item.disabled == false || item.visible != false && item.disabled == null);
    const filteredComboBoxItemsSecond = this.comboBoxItemsSecond.filter(item => item.visible != false && item.disabled == false || item.visible != false && item.disabled == null);

    this.comboBoxSettingsFirst.itemsSettings[0].isNeedReverseEmit = false;
    this.comboBoxSettingsSecond.itemsSettings[0].isNeedReverseEmit = false;

    let random = Math.floor(Math.random() * (this.comboBoxItems.length - 1));
    this.comboBoxSettingsFirst.itemsSettings[0].selectedValue.emit(filteredComboBoxItems[random]);
    this.comboBoxSettingsSecond.itemsSettings[0].selectedValue.emit(filteredComboBoxItemsSecond[random]);

    this.comboBoxSettingsFirst.itemsSettings[0].isNeedReverseEmit = true;
    this.comboBoxSettingsSecond.itemsSettings[0].isNeedReverseEmit = true;
  }

  /**
   * Добавление нового элемента в списки 1-2
   * @param item объект для добавления
   */
  public addComboBoxItem(item: any): void {
    // Если значение пустое или уже присутствует в списке, то не добавляем значение
    if (item.value.trim() === '' || this.comboBoxItems.some(existingItem => existingItem.display === item.value)) {
      return;
    }

    const newItem: IComboBoxItem = {
      value: { id: this.comboBoxItems.length + 1, content: item.value },
      display: item.value
    };

    this.comboBoxItems.push(newItem);
    this.comboBoxItemsSecond.push({ ...newItem, value: { ...newItem.value, id: this.comboBoxItemsSecond.length + 1 } });
  }

  /**
   * Очистить уникальный цвет для первого выпадающего списка
   */
  public clearSingleColor(): void {
    this.comboBoxSettingsFirst.fontColor = this.comboBoxSettingsFirst.defaultFontColor;
    this.comboBoxSettingsSecond.fontColor = this.comboBoxSettingsFirst.fontColor;
  }

  /**
   * Задать уникальный цвет для первого выпадающего списка
   */
  public changeSingleColor(): void {
    this.comboBoxSettingsFirst.fontColor = this.getRandomColor();
    this.comboBoxSettingsSecond.fontColor = this.comboBoxSettingsFirst.fontColor;
  }

  /**
   * Функция для случайного цвета
   * @returns случайный цвет
   */
  private getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * Смена режима для обработки результирующего значения
   */
  public changeMainMode(): void {
    this.comboBoxSettingsFirst.resultProcessing = this.mainMode;
    this.comboBoxSettingsSecond.resultProcessing = this.mainMode;
  }

  /**
   * Смена дополнительного режима для обработки результирующего значения
   */
  public changeAdditionalMode(): void {
    this.comboBoxSettingsFirst.resultProcessing = this.mainMode | this.additionalMode;
    this.comboBoxSettingsSecond.resultProcessing = this.mainMode | this.additionalMode;
  }

  /**
   * Смена режима поиска в комбобоксе
   */
  public changeSearchType(): void {
    this.comboBoxSettingsFirst.searchType = this.searchType;
    this.comboBoxSettingsSecond.searchType = this.searchType;
  }

  /**
   * Изменить добавлять ли пустое значение
   * @param event событие
   */
  public changeEmptyValue(event: any): void {
    this.comboBoxSettingsFirst.isAddedEmptyValue = event.target.checked;
  }

  /**
   * Изменить всегда ли отображать пустое значение
   * @param event событие
   */
  public changeVisibleEmptyValue(event: any): void {
    this.comboBoxSettingsFirst.isAlwaysDisplayEmptyValue = event.target.checked;
  }

  /**
   * Вывод информации, что был потерян фокус
   */
  public blurComboBox(): void {
    this.blurCount++;
  }

  /**
   * Вывод информации, что был потерян фокус второго комбобокса
   */
  public blurComboBoxSecond(): void {
    this.blurCountSecond++;
  }

  /**
   * Получение вводимого значения в поле ввода
   * @param event событие со значением
   */
  public inputChange(event: any): void {
    this.currentInputValue = event;
  }

  /**
   * Получение вводимого значения в поле ввода
   * @param event событие со значением
   */
  public inputChangeSecond(event: any): void {
      this.currentInputValueSecond = event;
  }

  /**
   * Получение значения из компонента, при множественном выборе
   */
  public getClickItemsSecond(items: IComboBoxItem[] | null): void {
    this.viewValueSecond = items != null ? items.map((item: any) => item.display).join(', ') : '';
    console.log('Во втором комбобоксе', items);
  }

  /**
   * Получение значения из компонента, при единичном выборе
   */
  public getClickItemsFirst(item: IComboBoxItem | null): void {
    this.viewValueFirst = item != null ? item.display : '';
    console.log('В первом комбобоксе', item);
  }

  /**
   * Установка размера
   */
  public setSize(): void {
    this.comboBoxSettingsSecond.size = this.comboBoxSettingsFirst.size;
  }

  /**
   * Устанавливает тип поля
   */
  public setComboBoxType(): void {
    this.comboBoxSettingsSecond.itemsSettings[0].type = this.comboBoxSettingsFirst.itemsSettings[0].type;
  }

  /**
   * Устанавливает значение подсказки
   */
  public setPlaceholder(): void {
    this.comboBoxSettingsSecond.placeholder = this.comboBoxSettingsFirst.placeholder;
  }

  /**
   * Установка ширины
   */
  public setWidth(): void {
    this.comboBoxSettingsSecond.width = this.comboBoxSettingsFirst.width;
  }

  /**
   * Установка одного и того же типа измерения ширины
   */
  public setWidthUnit(): void {
    this.comboBoxSettingsSecond.widthUnit = this.comboBoxSettingsFirst.widthUnit;
  }

  /**
   * Блокировка/разблокировка 4 элемента в выпадающем списке с множественным выбором
   */
  public setDisabledElementSettings(indexItem: number, status: any): void {
    let itemComboBox = this.comboBoxSettingsFirst.items[indexItem];
    itemComboBox.disabled = status.target.checked;

    let itemComboBoxSecond = this.comboBoxSettingsSecond.items[indexItem + 1];
    itemComboBoxSecond.disabled = status.target.checked;
  }

  /**
   * Установка цвета текста для всех компонентов
   */
  public setNewFontColor(): void {
    this.comboBoxSettingsSecond.fontColor = this.comboBoxSettingsFirst.fontColor;
  }

  /**
   * Установка цвета заднего фона для всех компонентов
   */
  public setNewBackgroundColor(): void {
    this.comboBoxSettingsSecond.backgroundColor = this.comboBoxSettingsFirst.backgroundColor;
  }

  /**
   * Установка цвета текста выбранного элемента для всех компонентов
   * @param indexItem индекс элемента в массиве
   */
  public setNewFontColorElement(indexItem: number): void {
    this.comboBoxItems[indexItem].color;
    this.comboBoxItemsSecond[indexItem + 1].color = this.comboBoxItems[indexItem].color;
  }

  /**
   * Установка значения жирный шрифт
   */
  public setBold(): void {
    this.comboBoxSettingsFirst.itemsSettings[0].isBold;
    this.comboBoxSettingsSecond.itemsSettings[0].isBold = this.comboBoxSettingsFirst.itemsSettings[0].isBold;
  }

  /**
   * Показать или скрыть элемент в списке
   * @param indexItem индекс элемента в массиве
   */
  public setVisibleElement(indexItem: number): void {
    this.comboBoxItems[indexItem].visible;
    this.comboBoxItemsSecond[indexItem + 1].visible = this.comboBoxItems[indexItem].visible;
  }

  /**
   * Определять автоматически расположение выпадающего списка
   * @param event событие при потере фокуса
   */
  public isReverseDropdownList(event: any): void {
    this.comboBoxSettingsFirst.isNeedReverseOpening = event.target.checked;
    this.comboBoxSettingsSecond.isNeedReverseOpening = event.target.checked;
  }

  /**
   * Метод для изменения значения margin-bottom между комбобоксами
   * @param newMarginBottom значение отступа в пикселях
   */
  public changeMarginBottomValue(newMarginBottom: number): void {
    this.marginBottomValue = newMarginBottom;
  }

  /**
   * Сброс выбранных без emit
   * @param status надо ли все очищать
   */
  public resetElements(status: boolean): void {
    this.comboBoxSettingsSecond.itemsSettings[0].clearSelectedValuesWithoutEmit.emit(status);
    this.comboBoxSettingsFirst.itemsSettings[0].clearSelectedValuesWithoutEmit.emit(status);
  }

  /**
   * Сброс выбранных c emit
   * @param status надо ли все очищать
   */
  public resetElementsWithEmit(status: boolean): void {
    this.comboBoxSettingsSecond.itemsSettings[0].clearSelectedValuesWithEmit.emit(status);
    this.comboBoxSettingsFirst.itemsSettings[0].clearSelectedValuesWithEmit.emit(status);
  }

  /**
   * Сброс выбранных элементов исключая заблокированные c emit
   * @param status надо ли все очищать
   */
  public resetElementsWithEmitAndDisabled(status: boolean): void {
    this.comboBoxSettingsSecond.itemsSettings[0].clearSelectedValuesWithEmit.emit(status);
  }

  /**
   * Сброс выбранных элементов исключая заблокированные без emit
   * @param status надо ли все очищать
   */
  public resetElementsWithoutEmitAndDisabled(status: boolean): void {
    this.comboBoxSettingsSecond.itemsSettings[0].clearSelectedValuesWithoutEmit.emit(status);
  }

  /** Установить значение marginBottom между компонентами комбобокс */
  public updateMarginBottom(): void {
    this.marginBottomValue = this.isUpdateMarginValue ? 0 : 600;
    this.isUpdateMarginValue = !this.isUpdateMarginValue;
  }
}