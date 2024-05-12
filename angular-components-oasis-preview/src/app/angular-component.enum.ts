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
  DigitInput = 7
}

export const AllComponents = new Map<AngularComponent, string>([
  [AngularComponent.Tabs, "Вкладки"],
  [AngularComponent.Button, "Кнопка"],
  [AngularComponent.ButtonExpand, "Кнопка раздвигающаяся"],
  [AngularComponent.Calendar, "Календарь"],
  [AngularComponent.CheckBox, "Чекбокс"],
  [AngularComponent.ComboBox, "Комбобокс"],
  [AngularComponent.DigitInput, "Числовое поле"]
]);