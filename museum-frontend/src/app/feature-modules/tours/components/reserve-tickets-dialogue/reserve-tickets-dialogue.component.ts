import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Tour } from "../../model/tour.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { TourReservation } from "../../model/tourReservation.model";
import { ToursService } from "../../tours.service";
import { TourPricelist } from "../../model/tourPricelist.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-reserve-tickets-dialogue',
  templateUrl: './reserve-tickets-dialogue.component.html',
  styleUrls: ['./reserve-tickets-dialogue.component.css'],
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
export class ReserveTicketsDialogueComponent{
  @Input() tour: Tour;
  private ownDialogRef: any;
  focused: string = '';
  buttonState: string = 'idle';
  estimatedPrice: string = '0';
  pricelist: TourPricelist | undefined;

  constructor(private dialogRef: MatDialogRef<ReserveTicketsDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private toursService: ToursService,
              private snackBar: MatSnackBar,) {
    this.tour = data;

    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist | undefined) => {
        this.pricelist = result;
      }
    })
  }

  reserveTourTicketsForm = new FormGroup({
    numberOfAdultTickets: new FormControl('', [Validators.required]),
    numberOfMinorTickets: new FormControl('', [Validators.required]),
  });

  onTicketsChange(event: any) {
    const estimatedPrice = Number(this.reserveTourTicketsForm.value.numberOfAdultTickets) * Number(this.pricelist?.adultTicketPrice)
    + Number(this.reserveTourTicketsForm.value.numberOfMinorTickets) * Number(this.pricelist?.minorTicketPrice)

    this.estimatedPrice = estimatedPrice.toString();
  }

  reserveButtonClicked() {
    const reservation: TourReservation = {
      numberOfAdultTickets: this.reserveTourTicketsForm.value.numberOfAdultTickets || "",
      numberOfMinorTickets: this.reserveTourTicketsForm.value.numberOfMinorTickets || "",
      tour: this.tour,
      tourId: this.tour.id,
    }

    this.toursService.addTourReservation(reservation).subscribe({
      next: (result: any) => {
        this.showNotification('Reservation successfully created!')
        this.dialogRef.close();
      }
    })
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  overviewClicked(){
    this.dialogRef.close();
  }

}
