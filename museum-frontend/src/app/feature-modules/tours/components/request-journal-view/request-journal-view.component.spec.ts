import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestJournalViewComponent } from './request-journal-view.component';

describe('RequestJournalViewComponent', () => {
  let component: RequestJournalViewComponent;
  let fixture: ComponentFixture<RequestJournalViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestJournalViewComponent]
    });
    fixture = TestBed.createComponent(RequestJournalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
