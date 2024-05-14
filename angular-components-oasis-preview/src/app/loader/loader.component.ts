import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OasisLoaderComponent, LoaderSettings, LoaderColorBackground } from '@oasis/loader';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [FormsModule, OasisLoaderComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  /** Текущие настройки приложения */
  public loaderSettings: LoaderSettings;

  /** Отображение загрузки */
  public visibleLoader = true;

  /** Алиас цветов фона для загрузчика */
  public LoaderColorBackground = LoaderColorBackground;
  
  public constructor() {
    this.loaderSettings = new LoaderSettings();
  }

  /**
   * Установка значения цвета для передачи в настройки
   */
  public setColorBackground(event: any): void {
    this.loaderSettings.colorBackground = Number(event.target.value);
  }
}