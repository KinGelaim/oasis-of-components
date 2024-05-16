import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisSwitcherComponent } from './oasis-switcher.component';

describe('OasisSwitcherComponent', () => {
  let component: OasisSwitcherComponent;
  let fixture: ComponentFixture<OasisSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisSwitcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
