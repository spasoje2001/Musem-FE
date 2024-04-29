import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningProposalFormComponent } from './cleaning-proposal-form.component';

describe('CleaningProposalFormComponent', () => {
  let component: CleaningProposalFormComponent;
  let fixture: ComponentFixture<CleaningProposalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningProposalFormComponent]
    });
    fixture = TestBed.createComponent(CleaningProposalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
