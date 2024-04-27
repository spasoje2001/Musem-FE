import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningProposalCardComponent } from './cleaning-proposal-card.component';

describe('CleaningProposalCardComponent', () => {
  let component: CleaningProposalCardComponent;
  let fixture: ComponentFixture<CleaningProposalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningProposalCardComponent]
    });
    fixture = TestBed.createComponent(CleaningProposalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
