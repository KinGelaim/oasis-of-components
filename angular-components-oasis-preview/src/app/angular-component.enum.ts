export enum AngularComponent {
  /** Кнопка */
  Button = 1,

  /** Кнопка раздвигающаяся */
  ButtonExpand = 2,

  /** Календарь */
  Calendar = 3,

  /** Чекбокс */
  CheckBox = 4,

  /** Комбобокс */
  ComboBox = 5,

  /** Числовое поле */
  DigitInput = 6,

  /** Выпадающий список */
  DropDownList = 7,

  /** Всплывающая подсказка */
  HintBox = 8,

  /** Загрузчик */
  Loader = 9,

  /** Модальное окно */
  ModalWindow = 10,

  /** Радио кнопка */
  RadioButton = 11,

  /** Укороченный календарь */
  ShortCalendar = 12,

  /** Переключатель */
  Switcher = 13,

  /** Вкладки (табы) */
  Tabs = 14,

  /** Текстовое поле */
  TextInput = 15,

  /** Временное поле */
  TimeInput = 16
}

export const AllComponents = new Map<AngularComponent, string>([
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
  [AngularComponent.Switcher, "Переключатель"],
  [AngularComponent.Tabs, "Вкладки"],
  [AngularComponent.TextInput, "Текстовое поле"],
  [AngularComponent.TimeInput, "Временное поле"]
]);