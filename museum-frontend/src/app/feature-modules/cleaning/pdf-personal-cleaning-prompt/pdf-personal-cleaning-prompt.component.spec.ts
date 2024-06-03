import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPersonalCleaningPromptComponent } from './pdf-personal-cleaning-prompt.component';

describe('PdfPersonalCleaningPromptComponent', () => {
  let component: PdfPersonalCleaningPromptComponent;
  let fixture: ComponentFixture<PdfPersonalCleaningPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfPersonalCleaningPromptComponent]
    });
    fixture = TestBed.createComponent(PdfPersonalCleaningPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
