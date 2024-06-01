import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsJournalCardViewComponent } from './requests-journal-card-view.component';

describe('RequestsJournalCardViewComponent', () => {
  let component: RequestsJournalCardViewComponent;
  let fixture: ComponentFixture<RequestsJournalCardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsJournalCardViewComponent]
    });
    fixture = TestBed.createComponent(RequestsJournalCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
