import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExhibitionProposal } from '../model/exhibition.model';

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { proposal: ExhibitionProposal }) {}
}
