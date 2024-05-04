/**
 * Интерфейс объекта для передачи в компонент "Вкладки"
 */
export interface ITabsItemSelectable {
  /** Идентификатор вкладки */
  id: number;

  display: string;

  selected?: boolean;

  disabled?: boolean;
}