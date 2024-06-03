import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfHandledRequestsPromptComponent } from './pdf-handled-requests-prompt.component';

describe('PdfHandledRequestsPromptComponent', () => {
  let component: PdfHandledRequestsPromptComponent;
  let fixture: ComponentFixture<PdfHandledRequestsPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfHandledRequestsPromptComponent]
    });
    fixture = TestBed.createComponent(PdfHandledRequestsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
