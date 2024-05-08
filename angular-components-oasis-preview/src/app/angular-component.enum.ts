export enum AngularComponent {
  /** Вкладки (табы) */
  Tabs = 1,

  /** Кнопка */
  Button = 2,

  /** Кнопка раздвигающаяся */
  ButtonExpand = 3,

  /** Календарь */
  Calendar = 4
}

export const AllComponents = new Map<AngularComponent, string>([
  [AngularComponent.Tabs, "Вкладки"],
  [AngularComponent.Button, "Кнопка"],
  [AngularComponent.ButtonExpand, "Кнопка раздвигающаяся"],
  [AngularComponent.Calendar, "Календарь"]
]);