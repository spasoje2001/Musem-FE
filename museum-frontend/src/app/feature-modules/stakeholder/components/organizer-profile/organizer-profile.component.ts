import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../model/organizer.model';
import { OrganizerService } from '../../services/organizer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { PdfOrganizerExhibitionsPromptComponent } from 'src/app/feature-modules/exhibitions/pdf-organizer-exhibitions-prompt/pdf-organizer-exhibitions-prompt.component';
import { ExhibitionProposalComponent } from 'src/app/feature-modules/exhibitions/exhibition-proposal/exhibition-proposal.component';
import { ProposalService } from 'src/app/feature-modules/exhibitions/proposal.service';
import { Exhibition, ExhibitionProposal } from 'src/app/feature-modules/exhibitions/model/exhibition.model';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css', '../shared-styles.css']
})
export class OrganizerProfileComponent implements OnInit {

  organizer?: Organizer;
  isExhibitionProposalFormOpen = false;
  requestsReportButtonState: string = "";

  exhibitions: Exhibition[] = [];
  proposals: ExhibitionProposal[] = [];

  private dialogRef: any;

  constructor(
    private organizerService: OrganizerService,
    private dialog: MatDialog,
    private proposalService: ProposalService,
    private exhibitionService: ExhibitionsService, // Dodajemo servis za izložbe,, 
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.organizerService.getLoggedInOrganizer().subscribe(organizer => {
      this.organizer = organizer;
      console.log(organizer);

      if (organizer) {
        this.loadExhibitions(organizer.id);
        this.loadProposals(organizer.id);
      }
    });
  }

  loadExhibitions(organizerId: number): void {
    this.exhibitionService.getExhibitionsByOrganizer(organizerId).subscribe(exhibitions => {
      this.exhibitions = exhibitions;
      console.log('Exhibitions:', this.exhibitions);
    });
  }

  loadProposals(organizerId: number): void {
    this.proposalService.getProposalsByOrganizer(organizerId).subscribe(proposals => {
      this.proposals = proposals;
      console.log('Proposals:', this.proposals);
    });
  }


  openExhibitionProposalForm() {
    const dialogRef = this.dialog.open(ExhibitionProposalComponent, {
      width: '500px',
      data: {
        organizerId: this.organizer!.id  
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  openOrganizerExhibitionsReportDialogue(): void {
    this.requestsReportButtonState = 'clicked';
    setTimeout(() => { this.requestsReportButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(PdfOrganizerExhibitionsPromptComponent, {
    });

    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.loadData();
      });
    }
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/exhibitions', id]);
  }

  editProposal(proposalId: number): void {
    // Ovde dodajte logiku za editovanje proposala
    console.log('Edit proposal:', proposalId);
    // Možete otvoriti dijalog za editovanje ili preusmeriti na drugu stranicu
}

deleteProposal(proposalId: number): void {
    // Ovde dodajte logiku za brisanje proposala
    console.log('Delete proposal:', proposalId);
    // Možete prikazati potvrdu pre brisanja ili odmah ukloniti iz liste
}

}




