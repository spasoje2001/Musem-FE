import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenialExplanationComponent } from './denial-explanation.component';

describe('DenialExplanationComponent', () => {
  let component: DenialExplanationComponent;
  let fixture: ComponentFixture<DenialExplanationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenialExplanationComponent]
    });
    fixture = TestBed.createComponent(DenialExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
