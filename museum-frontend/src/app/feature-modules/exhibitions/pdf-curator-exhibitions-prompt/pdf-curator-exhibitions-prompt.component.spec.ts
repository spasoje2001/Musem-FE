import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCuratorExhibitionsPromptComponent } from './pdf-curator-exhibitions-prompt.component';

describe('PdfCuratorExhibitionsPromptComponent', () => {
  let component: PdfCuratorExhibitionsPromptComponent;
  let fixture: ComponentFixture<PdfCuratorExhibitionsPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfCuratorExhibitionsPromptComponent]
    });
    fixture = TestBed.createComponent(PdfCuratorExhibitionsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
