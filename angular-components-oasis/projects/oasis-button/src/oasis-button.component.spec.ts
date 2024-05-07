import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisButtonComponent } from './oasis-button.component';

describe('OasisButtonComponent', () => {
  let component: OasisButtonComponent;
  let fixture: ComponentFixture<OasisButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
