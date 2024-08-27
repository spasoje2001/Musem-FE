import { Component, OnInit } from '@angular/core';
import { Curator } from '../../model/curator.model';
import { CuratorService } from '../../services/curator.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfCuratorExhibitionsPromptComponent } from 'src/app/feature-modules/exhibitions/pdf-curator-exhibitions-prompt/pdf-curator-exhibitions-prompt.component';
import { Exhibition, ExhibitionProposal } from 'src/app/feature-modules/exhibitions/model/exhibition.model';
import { ProposalService } from 'src/app/feature-modules/exhibitions/proposal.service';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curator-profile',
  templateUrl: './curator-profile.component.html',
  styleUrls: ['./curator-profile.component.css', '../shared-styles.css']
})
export class CuratorProfileComponent implements OnInit {

  curator?: Curator;
  requestsReportButtonState: string = "";
  exhibitions: Exhibition[] = [];
  proposals: ExhibitionProposal[] = [];

  private dialogRef: any;

  constructor(
    private curatorService: CuratorService,
    private dialog: MatDialog,
    private proposalService: ProposalService,
    private exhibitionService: ExhibitionsService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadCurator();
  }
  
  loadCurator(): void {
    this.curatorService.getLoggedInCurator().subscribe(curator => {
      console.log(curator);
      this.curator = curator;
      if (curator) {
        this.loadExhibitions(curator.id);
        this.loadProposals();
      }
    });
  }

  loadExhibitions(curatorId: number): void {
    this.exhibitionService.getExhibitionsByCurator(curatorId).subscribe(exhibitions => {
      this.exhibitions = exhibitions;
    });
  }

  loadProposals(): void {
    this.proposalService.getPendingProposals().subscribe(proposals => {
      this.proposals = proposals;
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/exhibitions', id]);
  }

  createExhibition(proposal: ExhibitionProposal): void {
    // Navigate to the CreateExhibitionComponent, passing the proposalId as a route parameter
    this.router.navigate(['/create-exhibition', proposal.id]);
  }


/*
  openOrganizerExhibitionsReportDialogue(): void {
    this.requestsReportButtonState = 'clicked';
    setTimeout(() => { this.requestsReportButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(PdfCuratorExhibitionsPromptComponent, {
    });

    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.loadData();
      });
    }
  }
    */

}
