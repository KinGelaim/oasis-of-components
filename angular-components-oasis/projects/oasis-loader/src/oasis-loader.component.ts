import { Component, Input } from '@angular/core';

import { LoaderSettings } from './shared/loader-settings.class';
import { ColorBackgroundLabel, LoaderColorBackground } from './shared/loader-color-background.enum';

@Component({
  selector: 'oasis-loader',
  standalone: true,
  imports: [],
  templateUrl: 'oasis-loader.component.html',
  styleUrl: 'oasis-loader.component.scss'
})
export class OasisLoaderComponent {
  /** Входящие настройки для работы компонента */
  @Input() 
  public loaderSettings!: LoaderSettings;

  /** Алиас цвета заднего фона */
  public LoaderColorBackground = LoaderColorBackground;

  /** Алиас для значений цветов заднего фона */
  public ColorBackgroundLabel = ColorBackgroundLabel;
}