import { Component, Input } from '@angular/core';
import { OasisButtonComponent } from '@oasis/button';

import { ModalSettings } from './shared/modal-settings.class';
import { ModalType } from './shared/modal-type.enum';

@Component({
  selector: 'oasis-modal-window',
  standalone: true,
  imports: [OasisButtonComponent],
  templateUrl: 'oasis-modal-window.component.html',
  styleUrl: 'oasis-modal-window.component.scss'
})
export class OasisModalWindowComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public modalSettings!: ModalSettings;

  /** Алиас типа модального окна */
  public ModalType = ModalType;

  /** Алиас компонента */
  public OasisModalWindowComponent = OasisModalWindowComponent;

  /** Статус модального окна */
  public static opened: boolean = false;

  /**
   * Открытие модального окна
   */
  public static openModal(): void {
    OasisModalWindowComponent.opened = true;
    window.addEventListener('keydown', OasisModalWindowComponent.modalKeyListener)
  }

  /**
   * Закрытие модального окна
   * Для вызова в приложении
   */
  public static closeModal(): void {
    OasisModalWindowComponent.opened = false;
    window.removeEventListener('keydown', OasisModalWindowComponent.modalKeyListener);
  }

  /**
   * Прослушивает нажатые клавиши
   * @param event событие
   */
  public static modalKeyListener(event: any): void {
    if (event.key === "Escape") {
      OasisModalWindowComponent.closeModal();
    }
    else if (event.key === "Tab") {
      event.preventDefault();
    }
  }

  /**
   * Выполнение действия при клике на левую кнопку
   * @param clickEntry событие
   */
  public clickLeftButton(clickEntry: any): void {
    this.modalSettings.callbackLeftButton.emit(this.modalSettings.argLeftButtonEmitter ?? clickEntry);
  };

  /**
   * Выполнение действия при клике на правую кнопку
   * @param clickEntry событие
   */
  public clickRightButton(clickEntry: any): void {
    this.modalSettings.callbackRightButton.emit(this.modalSettings.argRightButtonEmitter ?? clickEntry);
  };

  /**
   * Закрытие модального окна
   * @param event событие
   */
  public closeModal(event: any): void {
    if (event.target.attributes.class?.value === 'modal__close' ||
      event.target.attributes.class?.value === 'modal__close_image') {
      this.modalSettings.callbackCross.emit(this.modalSettings.argCrossButtonEmitter ?? event);
    }

    if (event.target.attributes.class?.value === 'body' && this.modalSettings.closeableWrapper) {
      this.modalSettings.callbackOuterModal.emit(this.modalSettings.argOuterModalButtonEmitter ?? event);
    }
  }
}