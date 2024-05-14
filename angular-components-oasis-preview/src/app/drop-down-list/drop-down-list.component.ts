import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropDownItemSettings, DropDownSettings, DropDownSize, DropDownUnit, IDropDownItem, OasisDropDownListComponent } from '@oasis/drop-down-list';

@Component({
  selector: 'app-drop-down-list',
  standalone: true,
  imports: [FormsModule, OasisDropDownListComponent],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.scss'
})
export class DropDownListComponent {
  // Текущие настройки
  public dropDownSettingsFirstAndSecond: DropDownSettings;
  public dropDownSettingsThird: DropDownSettings;
  public dropDownSettingsFourth: DropDownSettings;
  public dropDownSettingsFifth: DropDownSettings;

  /** Алиас размеров выпадающего списка */
  public DropDownSize = DropDownSize;

  /** Алиас единиц измерения */
  public DropDownUnit = DropDownUnit;

  // Текущие выбранные элементы
  public viewValueFirst: string;
  public viewValueSecond: string;
  public viewValueThird: string;
  public viewValueFourth: string;
  public viewValueFifth: string;

  /** Список значений для подстановки в поле значения для выпадающего списка */
  public arrayForDropDownList = [
    { id: 0, content: 'Контент 0' },
    { id: 1, content: 'Контент 1' },
    { id: 2, content: 'Контент 2' },
    { id: 3, content: 'Контент 3' },
    { id: 4, content: 'Контент 4' },
    { id: 5, content: 'Контент 5' },
    { id: 6, content: 'Контент 6' },
    { id: 7, content: 'ТестовоеНаименованиеБезПробеловДляИзбавленияОтСкролла' },
  ];

  /** Список объектов, который подключается к выпадающему списку */
  public dropDownItemsFirstAndSecond: Array<IDropDownItem> = [
    { value: this.arrayForDropDownList[0], display: this.arrayForDropDownList[0].content },
    { value: this.arrayForDropDownList[1], display: this.arrayForDropDownList[1].content },
    { value: this.arrayForDropDownList[2], display: this.arrayForDropDownList[2].content },
    { value: this.arrayForDropDownList[3], display: this.arrayForDropDownList[3].content, disabled: true },
    { value: this.arrayForDropDownList[4], display: this.arrayForDropDownList[4].content },
    { value: this.arrayForDropDownList[5], display: this.arrayForDropDownList[5].content },
    { value: this.arrayForDropDownList[6], display: this.arrayForDropDownList[6].content },
    { value: this.arrayForDropDownList[7], display: this.arrayForDropDownList[7].content }
  ];

  /** Список объектов, который подключается к выпадающему списку */
  public dropDownItemsThird: Array<IDropDownItem> = [
    { value: this.arrayForDropDownList[0], display: this.arrayForDropDownList[0].content },
    { value: this.arrayForDropDownList[1], display: this.arrayForDropDownList[1].content, disabled: true },
    { value: this.arrayForDropDownList[2], display: this.arrayForDropDownList[2].content },
    { value: this.arrayForDropDownList[3], display: this.arrayForDropDownList[3].content, disabled: true },
    { value: this.arrayForDropDownList[4], display: this.arrayForDropDownList[4].content },
    { value: this.arrayForDropDownList[5], display: this.arrayForDropDownList[5].content },
    { value: this.arrayForDropDownList[6], display: this.arrayForDropDownList[6].content },
    { value: this.arrayForDropDownList[7], display: this.arrayForDropDownList[7].content }
  ];

  /** Список объектов, который подключается к выпадающему списку */
  public dropDownItemsFourth: Array<IDropDownItem> = [
    { value: this.arrayForDropDownList[0], display: this.arrayForDropDownList[0].content },
    { value: this.arrayForDropDownList[1], display: this.arrayForDropDownList[1].content },
    { value: this.arrayForDropDownList[2], display: this.arrayForDropDownList[2].content },
    { value: this.arrayForDropDownList[3], display: this.arrayForDropDownList[3].content },
    { value: this.arrayForDropDownList[4], display: this.arrayForDropDownList[4].content },
    { value: this.arrayForDropDownList[5], display: this.arrayForDropDownList[5].content },
    { value: this.arrayForDropDownList[6], display: this.arrayForDropDownList[6].content },
    { value: this.arrayForDropDownList[7], display: this.arrayForDropDownList[7].content }
  ];

  /** Список объектов, который подключается к выпадающему списку */
  public dropDownItemsFifth: Array<IDropDownItem> = [
    { value: this.arrayForDropDownList[0], display: this.arrayForDropDownList[0].content },
    { value: this.arrayForDropDownList[1], display: this.arrayForDropDownList[1].content },
    { value: this.arrayForDropDownList[2], display: this.arrayForDropDownList[2].content, disabled: true },
    { value: this.arrayForDropDownList[3], display: this.arrayForDropDownList[3].content },
    { value: this.arrayForDropDownList[4], display: this.arrayForDropDownList[4].content, disabled: true },
    { value: this.arrayForDropDownList[5], display: this.arrayForDropDownList[5].content },
    { value: this.arrayForDropDownList[6], display: this.arrayForDropDownList[6].content },
    { value: this.arrayForDropDownList[7], display: this.arrayForDropDownList[7].content }
  ];

  public constructor() {
    this.dropDownSettingsFirstAndSecond = new DropDownSettings();
    this.dropDownSettingsThird = new DropDownSettings();
    this.dropDownSettingsFourth = new DropDownSettings();
    this.dropDownSettingsFifth = new DropDownSettings();

    this.dropDownSettingsFourth.isMultiSelectable = true;
    this.dropDownSettingsFifth.isMultiSelectable = true;

    this.dropDownSettingsFirstAndSecond.items = this.dropDownItemsFirstAndSecond;
    this.dropDownSettingsThird.items = this.dropDownItemsThird;
    this.dropDownSettingsFourth.items = this.dropDownItemsFourth;
    this.dropDownSettingsFifth.items = this.dropDownItemsFifth;

    this.dropDownSettingsFirstAndSecond.itemsSettings.push(new DropDownItemSettings(false, [this.dropDownItemsFirstAndSecond[1]], true));
    this.dropDownSettingsFirstAndSecond.itemsSettings.push(new DropDownItemSettings(false, undefined, true));
    this.dropDownSettingsThird.itemsSettings.push(new DropDownItemSettings(false, [this.dropDownItemsThird[3]], true));
    this.dropDownSettingsFourth.itemsSettings.push(new DropDownItemSettings(false, undefined, true));
    this.dropDownSettingsFifth.itemsSettings.push(new DropDownItemSettings(false, [this.dropDownItemsFifth[2], this.dropDownItemsFifth[3], this.dropDownItemsFifth[5]], true));

    this.viewValueFirst = this.dropDownSettingsFirstAndSecond.itemsSettings[0].selectedItems[0].display;
    this.viewValueSecond = '';
    this.viewValueThird = this.dropDownSettingsThird.itemsSettings[0].selectedItems[0].display;
    this.viewValueFourth = '';
    this.viewValueFifth = this.dropDownSettingsFifth.itemsSettings[0].selectedItems.map(item => { return item.display }).join(', ');
  }

  /**
   * Изменяет значение флага на повторный вызов одинаковых элементов
   */
  public changeRepeatEmit(event: any): void {
    this.dropDownSettingsFirstAndSecond.itemsSettings.forEach(el => el.isNeedRepeatedSelectionEmit = event.target.checked);
  }

  /**
   * Получение значения из компонента, при единичном выборе
   */
  public getClickItemFirst(item: IDropDownItem | null): void {
    this.viewValueFirst = item?.display ?? '';
  }


  /**
   * Получение значения из компонента, при множественном выборе
   */
  public getClickItemSecond(item: IDropDownItem | null): void {
    this.viewValueSecond = item?.display ?? '';
  }

  /**
   * Получение значения из компонента, при множественном выборе
   */
  public getClickItemThird(item: IDropDownItem | null): void {
    this.viewValueThird = item?.display ?? '';
  }

  /**
   * Получение значения из компонента, при множественном выборе
   */
  public getClickItemsFourth(items: IDropDownItem[] | null): void {
    this.viewValueFourth = items != null
      ? items.map((item: any) => { return item.display }).join(', ')
      : '';
  }

  /**
 * Получение значения из компонента, при единичном выборе
 */
  public getClickItemsFifth(items: IDropDownItem[] | null): void {
    this.viewValueFifth = items != null
      ? items.map((item: any) => { return item.display }).join(', ')
      : '';
  }

  /**
   * Тестовый выбор элементов
   */
  public selectElement(): void {
    let random = Math.floor(Math.random() * (this.dropDownItemsFifth.length - 1));
    this.dropDownSettingsFirstAndSecond.itemsSettings[0].selectedValue.emit(this.dropDownItemsFirstAndSecond[random]);

    random = Math.floor(Math.random() * (this.dropDownItemsFifth.length - 1));
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].selectedValue.emit(this.dropDownItemsFirstAndSecond[random]);
  }

  /**
   * Тестовый выбор элементов
   */
  public selectElementWithoutEmit(): void {
    this.dropDownSettingsFirstAndSecond.itemsSettings[0].isNeedReverseEmit = false;
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].isNeedReverseEmit = false;

    let random = Math.floor(Math.random() * (this.dropDownItemsFifth.length - 1));
    this.dropDownSettingsFirstAndSecond.itemsSettings[0].selectedValue.emit(this.dropDownItemsFirstAndSecond[random]);

    random = Math.floor(Math.random() * (this.dropDownItemsFifth.length - 1));
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].selectedValue.emit(this.dropDownItemsFirstAndSecond[random]);

    this.dropDownSettingsFirstAndSecond.itemsSettings[0].isNeedReverseEmit = true;
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].isNeedReverseEmit = true;
  }

  /**
   * Тестовый выбор элементов
   */
  public selectElements(): void {
    let random = Math.floor(Math.random() * (this.dropDownItemsFifth.length - 1));
    this.dropDownSettingsFourth.itemsSettings[0].selectedValue.emit(this.dropDownItemsFourth[random]);
  }

  /**
   * Добавление нового элемента в текущий выпадающий список
   * @param item значение элемента
   * @param disabled выключен ли элемент
   */
  public addDropDownItem(item: any, disabled: any) {
    let newItem: IDropDownItem = {
      value: { id: this.dropDownItemsFirstAndSecond.length + 1, content: item.value },
      display: item.value,
      disabled: disabled.checked
    };

    this.dropDownItemsFirstAndSecond.push(newItem);
    this.dropDownItemsThird.push(newItem);
    this.dropDownItemsFourth.push(newItem);
    this.dropDownItemsFifth.push(newItem);
  }

  /**
   * Установка включенного или выключенного значения
   */
  public setDisabled(): void {
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].isDisabled = this.dropDownSettingsFirstAndSecond.itemsSettings[0].isDisabled;
    this.dropDownSettingsThird.itemsSettings[0].isDisabled = this.dropDownSettingsFirstAndSecond.itemsSettings[0].isDisabled;
    this.dropDownSettingsFourth.itemsSettings[0].isDisabled = this.dropDownSettingsFirstAndSecond.itemsSettings[0].isDisabled;
    this.dropDownSettingsFifth.itemsSettings[0].isDisabled = this.dropDownSettingsFirstAndSecond.itemsSettings[0].isDisabled;
  }

  /**
   * Блокировка/разблокировка 4 элемента в выпадающем списке с множественным выбором
   */
  public setDisabledFourthElementFifthSettings(item: IDropDownItem): void {
    this.dropDownSettingsFifth.disabledElement.emit(item);
  }

  /**
   * Установка размера
   */
  public setSize(): void {
    this.dropDownSettingsThird.size = this.dropDownSettingsFirstAndSecond.size;
    this.dropDownSettingsFourth.size = this.dropDownSettingsFirstAndSecond.size;
    this.dropDownSettingsFifth.size = this.dropDownSettingsFirstAndSecond.size;
  }

  /**
   * Установка ширины
   */
  public setWidth(): void {
    this.dropDownSettingsThird.width = this.dropDownSettingsFirstAndSecond.width;
    this.dropDownSettingsFourth.width = this.dropDownSettingsFirstAndSecond.width;
    this.dropDownSettingsFifth.width = this.dropDownSettingsFirstAndSecond.width;
  }

  /**
   * Установка цвета текста для всех компонентов
   */
  public setNewFontColor(): void {
    this.dropDownSettingsThird.fontColor = this.dropDownSettingsFirstAndSecond.fontColor;
    this.dropDownSettingsFourth.fontColor = this.dropDownSettingsFirstAndSecond.fontColor;
    this.dropDownSettingsFifth.fontColor = this.dropDownSettingsFirstAndSecond.fontColor;
  }

  /**
   * Установка цвета заднего фона для всех компонентов
   */
  public setNewBackgroundColor(): void {
    this.dropDownSettingsThird.backgroundColor = this.dropDownSettingsFirstAndSecond.backgroundColor;
    this.dropDownSettingsFourth.backgroundColor = this.dropDownSettingsFirstAndSecond.backgroundColor;
    this.dropDownSettingsFifth.backgroundColor = this.dropDownSettingsFirstAndSecond.backgroundColor;
  }

  /**
   * Установка одного и того же типа измерения ширины
   */
  public setWidthUnit(): void {
    this.dropDownSettingsThird.widthUnit = this.dropDownSettingsFirstAndSecond.widthUnit;
    this.dropDownSettingsFourth.widthUnit = this.dropDownSettingsFirstAndSecond.widthUnit;
    this.dropDownSettingsFifth.widthUnit = this.dropDownSettingsFirstAndSecond.widthUnit;
  }

  /**
   * Сброс выбранных элементов для 1 и 2 (с emit)
   */
  public resetElement(): void {
    this.dropDownSettingsFirstAndSecond.itemsSettings[0].clearSelectedValuesWithEmit.emit(true);
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].clearSelectedValuesWithEmit.emit(true);
  }

  /**
   * Сброс выбранных элементов для 1 и 2 (без emit)
   */
  public resetElementWithoutEmit(): void {
    this.dropDownSettingsFirstAndSecond.itemsSettings[0].clearSelectedValues.emit(true);
    this.dropDownSettingsFirstAndSecond.itemsSettings[1].clearSelectedValues.emit(true);
  }

  /**
   * Сброс выбранных элементов для 4
   */
  public resetElementsFourth(): void {
    this.dropDownSettingsFourth.itemsSettings[0].clearSelectedValues.emit(true);
  }

  /**
   * Сброс выбранных элементов для 5
   * @param status надо ли все очищать
   */
  public resetElementsFifth(status: boolean): void {
    this.dropDownSettingsFifth.itemsSettings[0].clearSelectedValues.emit(status);
  }

  /**
   * Сброс выбранных элементов для 5
   * @param status надо ли все очищать
   */
  public resetElementsFifthWithEmit(status: boolean): void {
    this.dropDownSettingsFifth.itemsSettings[0].clearSelectedValuesWithEmit.emit(status);
  }

  /**
   * Вывод сообщения о фокусе на поле
   */
  public visibleFocus(event: any, index: number): void{
    console.log(`Установка focus в ${index} компонент`)
  }

  /**
   * Вывод сообщения о потере фокуса на поле ввода
   */
  public visibleBlur(event: any, index: number): void{
    console.log(`Установка blur в ${index} компонент`)
  }
}