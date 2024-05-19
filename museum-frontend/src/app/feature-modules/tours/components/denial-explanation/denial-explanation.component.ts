import {Component, Inject} from '@angular/core';
import {ToursService} from "../../tours.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonalTourRequest} from "../../model/personalTourRequest.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Organizer} from "../../../stakeholder/model/organizer.model";

@Component({
  selector: 'app-denial-explanation',
  templateUrl: './denial-explanation.component.html',
  styleUrls: ['./denial-explanation.component.css'],
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
export class DenialExplanationComponent {
  closeButtonState: string = '';
  focused: string = '';
  request: PersonalTourRequest | undefined;
  organizer: Organizer | undefined;
  denialReason: string = '';

  constructor(private toursService: ToursService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DenialExplanationComponent>,) {
    this.request = data;

    this.toursService.getOrganizerById(this.request?.organizerId!).subscribe({
      next: (result: Organizer) => {
        this.organizer = result;
        this.denialReason = this.organizer?.firstName + ' ' + this.organizer?.lastName + ' wrote: ' + this.request?.denialReason;
      }
    })
  }

  closeButtonClicked() {
    this.closeButtonState = 'clicked';
    setTimeout(() => { this.closeButtonState = 'idle'; }, 200);
    this.dialogRef.close();
  }

  overviewClicked(){
    this.dialogRef.close();
  }

}
