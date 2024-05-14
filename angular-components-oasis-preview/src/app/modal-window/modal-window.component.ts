import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalSettings, ModalType, OasisModalWindowComponent } from '@oasis/modal-window';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [FormsModule, OasisModalWindowComponent],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {
  /** Текущие настройки приложения */
  public modalSettings: ModalSettings;

  /** Алиас типа модального окна */
  public ModalType = ModalType;

  constructor() {
    this.modalSettings = new ModalSettings();
    this.modalSettings.isThereHeader = true;
    this.modalSettings.headerText = 'Заголовок';
    this.modalSettings.bodyText = 'Тело сообщения. Может содержать несколько строк. Лайтбокс не используется без тела сообщения.';
    this.modalSettings.buttonSettingsLeft.textButton = 'Отмена';
    this.modalSettings.buttonSettingsRight.textButton = 'Выполнить';

    this.modalSettings.argOuterModalButtonEmitter = "Строковый аргумент";
    this.modalSettings.callbackLeftButton.subscribe(this.clickLeftButton);
    this.modalSettings.callbackRightButton.subscribe(this.clickRightButton);
    this.modalSettings.callbackCross.subscribe(this.crossCallback);
    this.modalSettings.callbackOuterModal.subscribe(this.outerModalCallback);
  }

  /**
   * Открытие модального окна
   */
  public openModal() {
    OasisModalWindowComponent.openModal();
  }

  /**
   * Нажатие левой кнопки
   */
  private clickLeftButton(): void {
    alert('Нажата левая кнопка');
  }

  /**
   * Нажатие правой кнопки
   */
  private clickRightButton(): void {
    alert('Нажата правая кнопка');
  }

  /**
   * Закрытие модального окна
   */
  private crossCallback(): void {
    alert('Нажато закрытие модального окна');
    OasisModalWindowComponent.closeModal();
  }

  /**
   * Нажатие вне поля модального окна
   */
  private outerModalCallback(arg: any): void {
    alert('Нажато вне модального окна с аргументом: ' + arg);
  }
}