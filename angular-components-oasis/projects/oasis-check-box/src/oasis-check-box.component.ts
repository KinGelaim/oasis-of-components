import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckBoxSettings } from './shared/check-box-settings.class';
import { CheckBoxType } from './shared/check-box-type.enum';

// TODO: убрать FormsModule
@Component({
  selector: 'oasis-check-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'oasis-check-box.component.html',
  styleUrl: 'oasis-check-box.component.scss'
})
export class OasisCheckBoxComponent {
  /** Входящие настройки для работы компонента */
  @Input()
  public checkBoxSettings!: CheckBoxSettings;

  /** Алиас типа чекбокса */
  public CheckBoxType = CheckBoxType;
}
