import { Component } from '@angular/core';

import { AllComponents, AngularComponent } from './angular-component.enum';
import { TabsComponent } from './tabs/tabs.component';
import { ButtonComponent } from './button/button.component';
import { ButtonExpandComponent } from './button-expand/button-expand.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { DigitInputComponent } from './digit-input/digit-input.component';
import { DropDownListComponent } from './drop-down-list/drop-down-list.component';
import { HintBoxComponent } from './hint-box/hint-box.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TabsComponent,
    ButtonComponent,
    ButtonExpandComponent,
    CalendarComponent,
    CheckBoxComponent,
    ComboBoxComponent,
    DigitInputComponent,
    DropDownListComponent,
    HintBoxComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public AngularComponent = AngularComponent;

  public currentAngularComponent = AngularComponent.Tabs;

  public keysAllComponents: AngularComponent[] = [];

  public valuesAllComponents: string[] = [];

  public constructor() {
    for (let entry of AllComponents.entries()) {
      this.keysAllComponents.push(entry[0]);
      this.valuesAllComponents.push(entry[1]);
    }
  }

  public changeComponent(newComponent: AngularComponent) {
    this.currentAngularComponent = newComponent;
  }
}