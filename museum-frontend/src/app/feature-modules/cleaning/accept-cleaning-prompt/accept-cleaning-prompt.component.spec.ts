import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCleaningPromptComponent } from './accept-cleaning-prompt.component';

describe('AcceptCleaningPromptComponent', () => {
  let component: AcceptCleaningPromptComponent;
  let fixture: ComponentFixture<AcceptCleaningPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptCleaningPromptComponent]
    });
    fixture = TestBed.createComponent(AcceptCleaningPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
