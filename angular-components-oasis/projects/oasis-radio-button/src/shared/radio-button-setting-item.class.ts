/**
 * Класс в котором будут храниться настройки каждой из радио кнопок 
 */
export class RadioButtonSettingItem {
  /**
  * Конструктор для создания одной радиокнопки
  * @param label текст, который отображается рядом с радиокнопкой
  * @param checkedState текущее значение радиокнопки
  */
  public constructor(
    public label: string = '',
    public checkedState: boolean = false
  ) { }
}