import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTourPromptComponent } from './remove-tour-prompt.component';

describe('RemoveTourPromptComponent', () => {
  let component: RemoveTourPromptComponent;
  let fixture: ComponentFixture<RemoveTourPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveTourPromptComponent]
    });
    fixture = TestBed.createComponent(RemoveTourPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
