import { EventEmitter } from '@angular/core';

/**
 * Интерфейс объекта для передачи в компонент "Вкладки"
 */
export interface ITabsItemSelectable {
  /** Идентификатор вкладки */
  id: number;

  /** Отображаемое значение объекта */
  display: string;

  /** Выбранное состояние */
  selected?: boolean;

  /** Отключенное состояние */
  disabled?: boolean;

  /** Отключенное состояние левой иконки */
  disableLeftIcon?: boolean;

  /** Путь к левой иконке */
  leftIconUrlDefault?: string;

  /** Путь к левой иконке при наведении */
  leftIconUrlHover?: string;

  /** Путь к левой иконке при нажатии */
  leftIconUrlClick?: string;

  /** Путь к левой иконке при отключенной вкладке */
  leftIconUrlDisabled?: string;

  /** Ширина активной зоны левой иконки */
  leftIconAreaWidth?: number;

  /** Отключенное состояние правой иконки */
  disableRightIcon?: boolean;

  /** Путь к правой иконке */
  rightIconUrlDefault?: string;

  /** Путь к правой иконке при наведении */
  rightIconUrlHover?: string;

  /** Путь к правой иконке при нажатии */
  rightIconUrlClick?: string;

  /** Путь к правой иконке при отключенной вкладке */
  rightIconUrlDisabled?: string;

  /** Ширина активной зоны правой иконки */
  rightIconAreaWidth?: number;

  /** Колбэк нажатия левой иконки для получения значения */
  onLeftIconClick?: EventEmitter<ITabsItemSelectable>;

  /** Колбэк нажатия правой иконки для получения значения */
  onRightIconClick?: EventEmitter<ITabsItemSelectable>;
}