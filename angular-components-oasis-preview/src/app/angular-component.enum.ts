export enum AngularComponent {
  /** Вкладки (табы) */
  Tabs = 1
}

export const AllComponents = new Map<AngularComponent, string>([
  [AngularComponent.Tabs, "Вкладки"]
]);