import { Component, OnInit } from '@angular/core';
import { Curator } from '../../model/curator.model';
import { CuratorService } from '../../services/curator.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfCuratorExhibitionsPromptComponent } from 'src/app/feature-modules/exhibitions/pdf-curator-exhibitions-prompt/pdf-curator-exhibitions-prompt.component';
import { Exhibition, ExhibitionProposal } from 'src/app/feature-modules/exhibitions/model/exhibition.model';
import { ProposalService } from 'src/app/feature-modules/exhibitions/proposal.service';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { Router } from '@angular/router';
import { PdfOrganizerExhibitionsPromptComponent } from 'src/app/feature-modules/exhibitions/pdf-organizer-exhibitions-prompt/pdf-organizer-exhibitions-prompt.component';

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

        // Sortiranje izložbi
        this.exhibitions.sort((a, b) => {
            // Sortiranje po statusu
            const statusOrder = ['OPENED', 'READY_TO_OPEN', 'CLOSED'];
            const statusDifference = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);

            if (statusDifference !== 0) {
                return statusDifference;
            }

            // Sortiranje unutar statusa po datumu
            if (a.status === 'OPENED' || a.status === 'READY_TO_OPEN') {
                return this.parseDate(a.proposal.startDate).getTime() - this.parseDate(b.proposal.startDate).getTime();
            } else if (a.status === 'CLOSED') {
                return this.parseDate(b.proposal.endDate).getTime() - this.parseDate(a.proposal.endDate).getTime();
            }

            return 0;
        });

        console.log('Sorted Exhibitions:', this.exhibitions);
    });
}


loadProposals(): void {
  this.proposalService.getPendingProposals().subscribe(proposals => {
      this.proposals = proposals.sort((a, b) => {
          return this.parseDate(a.startDate).getTime() - this.parseDate(b.startDate).getTime();
      });

      console.log('Sorted Proposals:', this.proposals);
  });
}


  navigateToDetails(id: number) {
    this.router.navigate(['/exhibitions', id]);
  }

  createExhibition(proposal: ExhibitionProposal): void {
    // Navigate to the CreateExhibitionComponent, passing the proposalId as a route parameter
    this.router.navigate(['/create-exhibition', proposal.id]);
  }

  editExhibition(exhibitionId: number): void {
    this.router.navigate(['/edit-exhibition', exhibitionId]);
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Meseci u JavaScript-u su 0-indeksirani
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

getExhibitionStatusClass(status: string): string {
  switch (status) {
      case 'READY_TO_OPEN':
          return 'future-status';
      case 'OPENED':
          return 'current-status';
      case 'CLOSED':
          return 'past-status';
      default:
          return '';
  }
}

getExhibitionStatusText(status: string): string {
  switch (status) {
      case 'READY_TO_OPEN':
          return 'FUTURE';
      case 'OPENED':
          return 'CURRENT';
      case 'CLOSED':
          return 'PAST';
      default:
          return '';
  }
}

openReport(): void {
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

}
