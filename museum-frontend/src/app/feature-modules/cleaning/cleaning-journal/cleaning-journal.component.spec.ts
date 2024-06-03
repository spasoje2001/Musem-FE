import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningJournalComponent } from './cleaning-journal.component';

describe('CleaningJournalComponent', () => {
  let component: CleaningJournalComponent;
  let fixture: ComponentFixture<CleaningJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningJournalComponent]
    });
    fixture = TestBed.createComponent(CleaningJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
