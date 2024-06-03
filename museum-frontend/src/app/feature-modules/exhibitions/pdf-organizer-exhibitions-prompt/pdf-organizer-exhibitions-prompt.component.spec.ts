import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfOrganizerExhibitionsPromptComponent } from './pdf-organizer-exhibitions-prompt.component';

describe('PdfOrganizerExhibitionsPromptComponent', () => {
  let component: PdfOrganizerExhibitionsPromptComponent;
  let fixture: ComponentFixture<PdfOrganizerExhibitionsPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfOrganizerExhibitionsPromptComponent]
    });
    fixture = TestBed.createComponent(PdfOrganizerExhibitionsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
