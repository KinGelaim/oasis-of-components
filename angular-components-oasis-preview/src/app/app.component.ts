import { Component } from '@angular/core';

import { AllComponents, AngularComponent } from './angular-component.enum';
import { TabsComponent } from './tabs/tabs.component';
import { ButtonComponent } from './button/button.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TabsComponent,
    ButtonComponent,
    CalendarComponent
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