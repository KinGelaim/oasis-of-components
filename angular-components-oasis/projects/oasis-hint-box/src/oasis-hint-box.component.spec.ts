import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OasisHintBoxComponent } from './oasis-hint-box.component';

describe('OasisHintBoxComponent', () => {
  let component: OasisHintBoxComponent;
  let fixture: ComponentFixture<OasisHintBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OasisHintBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OasisHintBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
