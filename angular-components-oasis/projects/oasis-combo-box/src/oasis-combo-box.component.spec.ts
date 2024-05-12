import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisComboBoxComponent } from './oasis-combo-box.component';

describe('OasisComboBoxComponent', () => {
  let component: OasisComboBoxComponent;
  let fixture: ComponentFixture<OasisComboBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisComboBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
