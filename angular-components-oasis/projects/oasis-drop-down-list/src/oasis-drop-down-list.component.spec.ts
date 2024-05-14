import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisDropDownListComponent } from './oasis-drop-down-list.component';

describe('OasisDropDownListComponent', () => {
  let component: OasisDropDownListComponent;
  let fixture: ComponentFixture<OasisDropDownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisDropDownListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisDropDownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
