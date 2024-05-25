import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCleaningPromptComponent } from './pdf-cleaning-prompt.component';

describe('PdfCleaningPromptComponent', () => {
  let component: PdfCleaningPromptComponent;
  let fixture: ComponentFixture<PdfCleaningPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfCleaningPromptComponent]
    });
    fixture = TestBed.createComponent(PdfCleaningPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
