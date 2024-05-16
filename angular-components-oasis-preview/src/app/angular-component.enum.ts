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
  Loader = 10,

  /** Модальное окно */
  ModalWindow = 11,

  /** Радио кнопка */
  RadioButton = 12,

  /** Укороченный календарь */
  ShortCalendar = 13,

  /** Переключатель */
  Switcher = 14
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
  [AngularComponent.Loader, "Загрузчик"],
  [AngularComponent.ModalWindow, "Модальное окно"],
  [AngularComponent.RadioButton, "Радио кнопка"],
  [AngularComponent.ShortCalendar, "Укороченный календарь"],
  [AngularComponent.Switcher, "Переключатель"]
]);