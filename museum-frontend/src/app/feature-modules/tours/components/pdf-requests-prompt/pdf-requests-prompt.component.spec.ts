import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfRequestsPromptComponent } from './pdf-requests-prompt.component';

describe('PdfRequestsPromptComponent', () => {
  let component: PdfRequestsPromptComponent;
  let fixture: ComponentFixture<PdfRequestsPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfRequestsPromptComponent]
    });
    fixture = TestBed.createComponent(PdfRequestsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
