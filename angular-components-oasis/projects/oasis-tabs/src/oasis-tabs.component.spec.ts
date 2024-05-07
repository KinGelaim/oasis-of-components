import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisTabsComponent } from './oasis-tabs.component';

describe('OasisTabsComponent', () => {
  let component: OasisTabsComponent;
  let fixture: ComponentFixture<OasisTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
