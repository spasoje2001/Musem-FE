import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinationExplanationComponent } from './declination-explanation.component';

describe('DeclinationExplanationComponent', () => {
  let component: DeclinationExplanationComponent;
  let fixture: ComponentFixture<DeclinationExplanationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclinationExplanationComponent]
    });
    fixture = TestBed.createComponent(DeclinationExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
