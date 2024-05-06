export enum AngularComponent {
  /** Вкладки (табы) */
  Tabs = 1,

  /** Кнопка */
  Button = 2
}

export const AllComponents = new Map<AngularComponent, string>([
  [AngularComponent.Tabs, "Вкладки"],
  [AngularComponent.Button, "Кнопка"]
]);