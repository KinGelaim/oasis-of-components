import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisRadioButtonComponent } from './oasis-radio-button.component';

describe('OasisRadioButtonComponent', () => {
  let component: OasisRadioButtonComponent;
  let fixture: ComponentFixture<OasisRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisRadioButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
