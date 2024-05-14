import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintBoxSettings } from './shared/hint-box-settings.class';
import { HintBoxUnit } from './shared/hint-box-unit.enum';

@Component({
  selector: 'oasis-hint-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'oasis-hint-box.component.html',
  styleUrl: 'oasis-hint-box.component.scss'
})
export class OasisHintBoxComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public hintBoxSettings!: HintBoxSettings;

  /** Алиас единицы измерения компонента */
  public HintBoxUnit = HintBoxUnit;
}
