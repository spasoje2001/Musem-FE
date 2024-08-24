import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../model/organizer.model';
import { OrganizerService } from '../../services/organizer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { ProposeExhibitionComponent } from 'src/app/feature-modules/exhibitions/propose-exhibition/propose-exhibition.component';
import { PdfOrganizerExhibitionsPromptComponent } from 'src/app/feature-modules/exhibitions/pdf-organizer-exhibitions-prompt/pdf-organizer-exhibitions-prompt.component';
import { ExhibitionProposalComponent } from 'src/app/feature-modules/exhibitions/exhibition-proposal/exhibition-proposal.component';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css', '../shared-styles.css']
})
export class OrganizerProfileComponent implements OnInit {

  organizer?: Organizer;
  events: Event[] = [];
  isExhibitionProposalFormOpen = false;
  requestsReportButtonState: string = "";

  private dialogRef: any;

  constructor(
    private guestService: OrganizerService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.guestService.getLoggedInOrganizer().subscribe(organizer => {
      this.organizer = organizer;
      console.log(organizer);
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
}


