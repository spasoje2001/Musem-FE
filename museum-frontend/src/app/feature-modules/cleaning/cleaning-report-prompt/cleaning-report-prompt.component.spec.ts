import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningReportPromptComponent } from './cleaning-report-prompt.component';

describe('CleaningReportPromptComponent', () => {
  let component: CleaningReportPromptComponent;
  let fixture: ComponentFixture<CleaningReportPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningReportPromptComponent]
    });
    fixture = TestBed.createComponent(CleaningReportPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
