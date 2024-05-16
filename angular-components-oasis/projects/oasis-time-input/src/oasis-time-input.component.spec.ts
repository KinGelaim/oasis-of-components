import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisTimeInputComponent } from './oasis-time-input.component';

describe('OasisTimeInputComponent', () => {
  let component: OasisTimeInputComponent;
  let fixture: ComponentFixture<OasisTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisTimeInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
