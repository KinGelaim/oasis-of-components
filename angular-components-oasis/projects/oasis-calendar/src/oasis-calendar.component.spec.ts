import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisCalendarComponent } from './oasis-calendar.component';

describe('OasisCalendarComponent', () => {
  let component: OasisCalendarComponent;
  let fixture: ComponentFixture<OasisCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
