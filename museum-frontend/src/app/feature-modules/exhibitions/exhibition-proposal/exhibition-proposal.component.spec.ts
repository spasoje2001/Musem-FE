import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionProposalComponent } from './exhibition-proposal.component';

describe('ExhibitionProposalComponent', () => {
  let component: ExhibitionProposalComponent;
  let fixture: ComponentFixture<ExhibitionProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitionProposalComponent]
    });
    fixture = TestBed.createComponent(ExhibitionProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
