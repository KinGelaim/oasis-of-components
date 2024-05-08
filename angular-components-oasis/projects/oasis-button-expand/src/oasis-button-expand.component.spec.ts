import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisButtonExpandComponent } from './oasis-button-expand.component';

describe('OasisButtonExpandComponent', () => {
  let component: OasisButtonExpandComponent;
  let fixture: ComponentFixture<OasisButtonExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisButtonExpandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisButtonExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
