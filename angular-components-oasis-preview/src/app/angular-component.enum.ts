export enum AngularComponent {
  /** Вкладки (табы) */
  Tabs = 1,

  /** Кнопка */
  Button = 2,

  /** Кнопка раздвигающаяся */
  ButtonExpand = 3,

  /** Календарь */
  Calendar = 4,

  /** Чекбокс */
  CheckBox = 5,

  /** Комбобокс */
  ComboBox = 6,

  /** Числовое поле */
  DigitInput = 7,

  /** Выпадающий список */
  DropDownList = 8,

  /** Всплывающая подсказка */
  HintBox = 9,

  /** Загрузчик */
  Loader = 10
}

export const AllComponents = new Map<AngularComponent, string>([
  [AngularComponent.Tabs, "Вкладки"],
  [AngularComponent.Button, "Кнопка"],
  [AngularComponent.ButtonExpand, "Кнопка раздвигающаяся"],
  [AngularComponent.Calendar, "Календарь"],
  [AngularComponent.CheckBox, "Чекбокс"],
  [AngularComponent.ComboBox, "Комбобокс"],
  [AngularComponent.DigitInput, "Числовое поле"],
  [AngularComponent.DropDownList, "Выпадающий список"],
  [AngularComponent.HintBox, "Всплывающая подсказка"],
  [AngularComponent.Loader, "Загрузчик"]
]);