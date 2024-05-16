import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisSwitcherComponent, SwitcherColor, SwitcherItem, SwitcherItemStatus, SwitcherSettings, SwitcherSize, SwitcherUnit } from '@oasis/switcher';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [FormsModule, OasisSwitcherComponent],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss'
})
export class SwitcherComponent {
  /** Текущие настройки */
  public switcherSettings: SwitcherSettings;

  /** Алиас размера переключателя */
  public SwitcherSize = SwitcherSize;

  /** Алиас единицы измерения переключателя */
  public SwitcherUnit = SwitcherUnit;

  /** Алиас статусов переключателя */
  public SwitcherItemStatus = SwitcherItemStatus;

  /** Алиас цветов выделения */
  public SwitcherColor = SwitcherColor;

  /** Текущий выбранный объект */
  public selectedValue: SwitcherItem;

  /** Текущий объект, на который было наведение курсором */
  public hoverValue: string = '';

  /** Тестовый объект для добавления в список */
  public testObject: SwitcherItem;

  public constructor() {
    this.switcherSettings = new SwitcherSettings();
    this.switcherSettings.width = 500;
    this.switcherSettings.values = [
      new SwitcherItem(1, 'Первый', 4, SwitcherItemStatus.Selected, SwitcherColor.Blue),
      new SwitcherItem(2, 'Второй', 4, SwitcherItemStatus.Normal, SwitcherColor.Green),
      new SwitcherItem(3, 'Третий', 8, SwitcherItemStatus.Disable, SwitcherColor.Blue),
      new SwitcherItem(4, 'Четвертый', 16, SwitcherItemStatus.Normal, SwitcherColor.Orange)];

    this.selectedValue = this.switcherSettings.values.filter((item: any) => item.status == SwitcherItemStatus.Selected)[0];
    this.testObject = new SwitcherItem(this.switcherSettings.values.length + 1, 'Test', 10, SwitcherItemStatus.Normal, SwitcherColor.Blue);
  }

  /**
   * Получение значения из компонента
   * @param item объект
   */
  public getClickItem(item: SwitcherItem): void {
    console.log(item);
    this.selectedValue = item;
  }

  /**
   * Установка нового выбранного значения
   */
  public setNewSelectItem(event: any): void {
    let item = this.switcherSettings.values.find((item: any) => item.id == event.target.value);
    if (item != null) {
      this.switcherSettings.selectedValue.emit(item);
    }
  }

  /**
   * Добавление нового объекта
   */
  public addNewObject(): void {
    this.switcherSettings.values.push(this.testObject);
    this.testObject = new SwitcherItem(this.switcherSettings.values.length + 1, 'Test', 10, SwitcherItemStatus.Normal, SwitcherColor.Blue);
  }

  /**
   * Наведение на объект курсора
   * @param item объект
   */
  public mouseEnter(item: SwitcherItem): void {
    if (item.status != SwitcherItemStatus.Disable) {
      this.hoverValue = item.name;
    }
  }

  /**
   * Снятие наведения курсора на объект
   * @param item объект
   */
  public mouseLeave(item: SwitcherItem): void {
    this.hoverValue = '';
  }

  /**
   * Изменяет значение флага на повторный вызов одинаковых элементов
   */
  public changeRepeatEmit(event: any): void {
    this.switcherSettings.isNeedRepeatedSelectionEmit = event.target.checked;
  }
}