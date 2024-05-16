import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisTextInputComponent } from './oasis-text-input.component';

describe('OasisTextInputComponent', () => {
  let component: OasisTextInputComponent;
  let fixture: ComponentFixture<OasisTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisTextInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
