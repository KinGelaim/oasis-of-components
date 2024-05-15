import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisShortCalendarComponent } from './oasis-short-calendar.component';

describe('OasisShortCalendarComponent', () => {
  let component: OasisShortCalendarComponent;
  let fixture: ComponentFixture<OasisShortCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisShortCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisShortCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
