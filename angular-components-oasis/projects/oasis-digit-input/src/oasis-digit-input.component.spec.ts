import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisDigitInputComponent } from './oasis-digit-input.component';

describe('OasisDigitInputComponent', () => {
  let component: OasisDigitInputComponent;
  let fixture: ComponentFixture<OasisDigitInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisDigitInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisDigitInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
