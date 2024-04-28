import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineCleaningPromptComponent } from './decline-cleaning-prompt.component';

describe('DeclineCleaningPromptComponent', () => {
  let component: DeclineCleaningPromptComponent;
  let fixture: ComponentFixture<DeclineCleaningPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclineCleaningPromptComponent]
    });
    fixture = TestBed.createComponent(DeclineCleaningPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
