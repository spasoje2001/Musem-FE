import { Component, Inject, OnInit } from '@angular/core';
import { PersonalTourRequest, PersonalTourRequestStatus } from '../../model/personalTourRequest.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToursService } from '../../tours.service';
import { DeclineRequestPromptComponent } from '../decline-request-prompt/decline-request-prompt.component';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonalTour } from '../../model/personalTour.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  request: PersonalTourRequest | undefined;
  curators: Curator[] = [];
  selectedCurator: Curator | undefined;
  focused: string = '';

  constructor(private toursService: ToursService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DeclineRequestPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.request = data;

    this.toursService.getCurators().subscribe({
      next: (result: Curator[] | Curator) => {
        if (Array.isArray(result)) {
          this.curators = result;
          console.log(this.curators);
        }
      }
    })
  }

  acceptRequestForm = new FormGroup({
    adultTicketPrice: new FormControl('', [Validators.required]),
    minorTicketPrice: new FormControl('', [Validators.required]),
  });

  onChooseClicked(curator: Curator){
    this.selectedCurator = curator;
  }

  acceptButtonClicked(){
    if (this.acceptRequestForm.valid) {
      this.acceptButtonState = 'clicked'; 
      setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 

      this.request!.status = PersonalTourRequestStatus.ACCEPTED;
      
      this.toursService.updateTourRequest(this.request!).subscribe({
        next: () => {

          const tour: PersonalTour = {
            occurrenceDateTime: this.request!.occurrenceDateTime || new Date(),
            adultTicketPrice: this.acceptRequestForm.value.adultTicketPrice?.toString() || "",
            minorTicketPrice: this.acceptRequestForm.value.minorTicketPrice?.toString() || "",
            guestNumber: this.request!.guestNumber || "",
            proposerId: this.request!.proposerId || 0,
            duration: "0",
            //guideId: this.selectedCurator!.id || 7,
            guideId: 7,
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
