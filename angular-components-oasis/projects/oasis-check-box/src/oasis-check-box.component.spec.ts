import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisCheckBoxComponent } from './oasis-check-box.component';

describe('OasisCheckBoxComponent', () => {
  let component: OasisCheckBoxComponent;
  let fixture: ComponentFixture<OasisCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisCheckBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
