import { EventEmitter } from '@angular/core';
import { ButtonSettings, ButtonSize, ButtonType } from '@oasis/button';

import { ModalType } from './modal-type.enum';

/**
 * Хранит настройки для модального окна
 */
export class ModalSettings {
  /** Наличие заголовка */
  public isThereHeader: boolean = true;

  /** Текст заголовка */
  private _headerText: string | undefined = '';

  /** Получение текста заголовка */
  public get headerText(): string | undefined {
    return this._headerText;
  }

  /** Назначение текста заголовка */
  public set headerText(value: string | undefined) {
    this.isThereHeader = !(value == '' || value == undefined || value == null || /^\s+$/.test(value));
    this._headerText = value;
  }

  /** Настройки левой кнопки */
  public buttonSettingsLeft!: ButtonSettings;

  /** Настройки правой кнопки */
  public buttonSettingsRight!: ButtonSettings;

  /** Колбэк для левой кнопки */
  public callbackLeftButton: EventEmitter<any>;

  /** Колбэк для правой кнопки */
  public callbackRightButton: EventEmitter<any>;

  /** Колбэк для нажатия вне модального окна */
  public callbackOuterModal: EventEmitter<any>;

  /** Колбэк для нажатия на крестик модального окна */
  public callbackCross: EventEmitter<any>;

  /**
   * Создание модального окна
   * @param modalType тип модального окна
   * @param headerText текст заголовка
   * @param bodyText текст сообщения
   * @param isThereFooter наличие подвала с кнопками и сообщениями об ошибках
   * @param closeableWrapper закрытие по нажатию вне пределов модального окна
   * @param leftButtonText текст левой кнопки
   * @param rightButtonText текст правой кнопки
   * @param argLeftButtonEmitter аргумент для эмиттера левой кнопки
   * @param argRightButtonEmitter аргумент для эмиттера правой кнопки
   * @param argOuterModalButtonEmitter аргумент для эмиттера клика вне модального окна
   * @param argCrossButtonEmitter аргумент для эмиттера клика на крестик модального окна
   */
  constructor(
    public modalType: string = ModalType.Normal,
    headerText: string = '',
    public bodyText?: string,
    public isThereFooter: boolean = true,
    public closeableWrapper = true,
    public argLeftButtonEmitter: any = null,
    public argRightButtonEmitter: any = null,
    public argOuterModalButtonEmitter: any = null,
    public argCrossButtonEmitter: any = null
  ) {
    this.headerText = headerText;

    this.callbackLeftButton = new EventEmitter();
    this.callbackRightButton = new EventEmitter();
    this.callbackOuterModal = new EventEmitter();
    this.callbackCross = new EventEmitter();

    this.buttonSettingsLeft = new ButtonSettings();
    this.buttonSettingsLeft.size = ButtonSize.Large;
    this.buttonSettingsLeft.type = ButtonType.MainTransparent;

    this.buttonSettingsRight = new ButtonSettings();
    this.buttonSettingsRight.size = ButtonSize.Large;
  }
}