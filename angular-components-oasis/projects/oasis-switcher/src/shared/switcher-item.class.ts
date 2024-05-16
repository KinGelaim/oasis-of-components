import { SwitcherItemStatus } from './switcher-item-status.enum';
import { SwitcherColor } from './switcher-color.enum';

/**
 * Объект, который хранится внутри кнопки переключателя
 */
export class SwitcherItem {
  /**
   * Создание объекта для передачи в переключатель
   * @param id уникальный идентификатор
   * @param name наименование объекта для отображения в переключателе
   * @param value значение, которое будут возвращаться при выборе значения
   * @param status указывает на статус текущего объекта
   * @param colorClick указывает, какой будет цвет при выборе объекта (выделение)
   */
  public constructor(
    public id: number,
    public name: string,
    public value: any,
    public status: SwitcherItemStatus = SwitcherItemStatus.Normal,
    public colorClick: SwitcherColor = SwitcherColor.Blue) {
  }
}