import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExhibitionProposal, ExhibitionTheme } from '../model/exhibition.model';
import { MatDialog } from '@angular/material/dialog';
import { ProposalDetailsComponent } from '../proposal-details/proposal-details.component';
import { ActivatedRoute } from '@angular/router';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-create-exhibition',
  templateUrl: './create-exhibition.component.html',
  styleUrls: ['./create-exhibition.component.css']
})
export class CreateExhibitionComponent implements OnInit {
  exhibitionForm: FormGroup;
  themes = Object.values(ExhibitionTheme); // Replace with actual enum values
  filteredItems = []; // This will be populated with items filtered based on search
  proposal!: ExhibitionProposal;
  itemSearch = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private proposalService: ProposalService
  ) {
    this.exhibitionForm = this.fb.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      shortDescription: ['', Validators.required],
      pictureUrl: ['', Validators.required],
      longDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Retrieve proposalId from route parameters
    const proposalId = this.route.snapshot.paramMap.get('proposalId');
    if (proposalId) {
      this.loadProposalById(+proposalId); // Convert proposalId to a number
    }
  }

  loadProposalById(proposalId: number): void {
    this.proposalService.getProposalById(proposalId).subscribe(
      (proposal: ExhibitionProposal) => {
        this.proposal = proposal;
        console.log('Proposal loaded:', this.proposal);
      },
      (error) => {
        console.error('Error loading proposal:', error);
      }
    );
  }

  openProposalDetails(): void {
    this.dialog.open(ProposalDetailsComponent, {
      width: '400px',
      data: { proposal: this.proposal }  // Passing the loaded proposal data
    });
  }


  selectItem(item: any): void {
    // Handle item selection
  }
}
