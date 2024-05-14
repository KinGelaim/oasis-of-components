import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisModalWindowComponent } from './oasis-modal-window.component';

describe('OasisModalWindowComponent', () => {
  let component: OasisModalWindowComponent;
  let fixture: ComponentFixture<OasisModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisModalWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
