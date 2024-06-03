import { Component, Inject } from '@angular/core';
import { PersonalTourRequest, PersonalTourRequestStatus } from '../../model/personalTourRequest.model';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ToursService } from '../../tours.service';
import { DeclineRequestPromptComponent } from '../decline-request-prompt/decline-request-prompt.component';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonalTour } from '../../model/personalTour.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourPricelist } from "../../model/tourPricelist.model";
import {CuratorChoosingDialogueComponent} from "../curator-choosing-dialogue/curator-choosing-dialogue.component";

@Component({
  selector: 'app-accept-request-form',
  templateUrl: './accept-request-form.component.html',
  styleUrls: ['./accept-request-form.component.css'],
  animations: [
      trigger('buttonState', [
        state('clicked', style({
          transform: 'scale(0.9)',
          opacity: 0.5
        })),
        transition('* => clicked', [
          animate('200ms')
        ]),
        transition('clicked => idle', [
          animate('200ms')
        ])
      ]),
  ],
})
export class AcceptRequestFormComponent{
  cancelButtonState: string = 'idle';
  acceptButtonState: string = 'idle';
  selectCuratorbuttonState: string = 'idle';
  request: PersonalTourRequest | undefined;
  curators: Curator[] = [];
  selectedCurator: Curator[] = [];
  focused: string = '';
  tourPricelist: TourPricelist | undefined;
  private ownDialogRef: any;
  adultTicketPrice: string = "0";
  minorTicketPrice: string = "0";

  constructor(private toursService: ToursService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DeclineRequestPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,) {
    this.request = data;

    this.toursService.getCurators().subscribe({
      next: (result: Curator[] | Curator) => {
        if (Array.isArray(result)) {
          this.curators = result;
          console.log(this.curators);
        }
      }
    })

    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist) => {
        this.tourPricelist = result;
        this.adultTicketPrice = (this.request?.exhibitions?.length! * Number(this.tourPricelist?.adultTicketPrice)).toString();
        this.minorTicketPrice = (this.request?.exhibitions?.length! * Number(this.tourPricelist?.minorTicketPrice)).toString();

        console.log('Adult ticket price: ' + this.adultTicketPrice);
        console.log('Minor ticket price: ' + this.minorTicketPrice);
      }
    })
  }

  acceptButtonClicked(){
      this.acceptButtonState = 'clicked';
      setTimeout(() => { this.acceptButtonState = 'idle'; }, 200);

      this.request!.status = PersonalTourRequestStatus.ACCEPTED;

      this.toursService.updateTourRequest(this.request!).subscribe({
        next: () => {

          const tour: PersonalTour = {
            occurrenceDateTime: this.request!.occurrenceDateTime || new Date(),
            adultTicketPrice: this.adultTicketPrice || "",
            minorTicketPrice: this.minorTicketPrice || "",
            guestNumber: this.request!.guestNumber || "",
            proposerId: this.request!.proposerId || 0,
            guideId: this.selectedCurator[0].id || 7,
            duration: "0",
            exhibitions: this.request?.exhibitions || []
          };

          this.toursService.addPersonalTour(tour).subscribe({
            next: () => {
              this.showNotification('Tour request successfully accepted!');
              this.dialogRef.close();
            }
          })
        }
      });
  }

  selectCuratorButtonClicked() {
    this.selectCuratorbuttonState = 'clicked';
    setTimeout(() => { this.selectCuratorbuttonState = 'idle'; }, 200);
    this.ownDialogRef = this.dialog.open(CuratorChoosingDialogueComponent, {
      data: this.selectedCurator
    });
    this.ownDialogRef.afterClosed().subscribe((result: any) => {
      console.log('Odabrao si kuratora: ' + this.selectedCurator);
    });
  }

  cancelButtonClicked(){
    this.cancelButtonState = 'clicked';
    setTimeout(() => { this.cancelButtonState = 'idle'; }, 200);
    this.dialogRef.close();
  }

  overviewClicked(){
    this.dialogRef.close();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

}
