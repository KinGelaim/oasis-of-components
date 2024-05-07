export enum AngularComponent {
  /** Вкладки (табы) */
  Tabs = 1,

  /** Кнопка */
  Button = 2,

  /** Календарь */
  Calendar = 3
}

export const AllComponents = new Map<AngularComponent, string>([
  [AngularComponent.Tabs, "Вкладки"],
  [AngularComponent.Button, "Кнопка"],
  [AngularComponent.Calendar, "Календарь"]
]);