import {Component, Inject, Input, OnInit} from '@angular/core';
import { ToursService } from "../../tours.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Exhibition } from "../../../exhibitions/model/exhibition.model";
import { TourPricelist } from "../../model/tourPricelist.model";
import { EditTourFormComponent } from "../edit-tour-form/edit-tour-form.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExhibitionChoosingDialogueComponent } from "../exhibition-choosing-dialogue/exhibition-choosing-dialogue.component";
import { PersonalTourRequest, PersonalTourRequestStatus } from "../../model/personalTourRequest.model";
import {Tour} from "../../model/tour.model";

@Component({
  selector: 'app-edit-tour-request-form',
  templateUrl: './edit-tour-request-form.component.html',
  styleUrls: ['./edit-tour-request-form.component.css']
})
export class EditTourRequestFormComponent implements OnInit{
  routeButtonState: string = 'idle';
  submitButtonState: string = 'idle';
  focused: string = '';
  minDate: string;
  selectedExhibitions: Exhibition[] = [];
  private ownDialogRef: any;
  adultTicketPrice: string = "0";
  minorTicketPrice: string = "0";
  tourPricelist: TourPricelist | undefined;
  @Input() request: PersonalTourRequest;

  constructor(private toursService: ToursService,
              private dialogRef: MatDialogRef<EditTourFormComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,){
    this.request = data;
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist) => {
        this.tourPricelist = result;
      }
    })

    this.editTourRequestForm.reset();
    const requestToPatch = {
      occurrenceDateTime: this.request.occurrenceDateTime,
      guestNumber: this.request.guestNumber,
      contactPhone: this.request.proposerContactPhone
    }
    this.editTourRequestForm.patchValue(requestToPatch);
  }

  editTourRequestForm = new FormGroup({
    //duration: new FormControl('', [Validators.required]),
    occurrenceTime: new FormControl(null, [Validators.required]),
    occurrenceDate: new FormControl(null, [Validators.required]),
    guestNumber: new FormControl('', [Validators.required]),
    contactPhone: new FormControl('', [Validators.required]),
  });

  selectRouteButtonClicked(){
    this.routeButtonState = 'clicked';
    setTimeout(() => { this.routeButtonState = 'idle'; }, 200);
    this.ownDialogRef = this.dialog.open(ExhibitionChoosingDialogueComponent, {
      data: this.selectedExhibitions
    });
    this.ownDialogRef.afterClosed().subscribe((result: any) => {
      console.log('Odabrao si egzibicie: ' + this.selectedExhibitions);
      this.adultTicketPrice = (this.selectedExhibitions.length * Number(this.tourPricelist?.adultTicketPrice)).toString();
      this.minorTicketPrice = (this.selectedExhibitions.length * Number(this.tourPricelist?.minorTicketPrice)).toString();

      console.log('Adult ticket price: ' + this.adultTicketPrice);
      console.log('Minor ticket price: ' + this.minorTicketPrice);
    });
  }

  editTourRequestButtonClicked(){
    this.submitButtonState = 'clicked';
    setTimeout(() => { this.submitButtonState = 'idle'; }, 200);

    const request: PersonalTourRequest = {
      occurrenceDateTime: this.editTourRequestForm.value.occurrenceDate || new Date(),
      guestNumber: this.editTourRequestForm.value.guestNumber || "",
      status: PersonalTourRequestStatus.IN_PROGRESS,
      proposerContactPhone: this.editTourRequestForm.value.contactPhone || ""
    };

    console.log(request);

    if (this.editTourRequestForm.valid) {
      this.submitButtonState = 'clicked';
      setTimeout(() => { this.submitButtonState = 'idle'; }, 200);

      // Postavi datum i vreme
      const dateValue: Date | null = this.editTourRequestForm.value.occurrenceDate!;
      const timeValue: string | null = this.editTourRequestForm.value.occurrenceTime!;

      const [hours, minutes] = (timeValue as string).split(':');
      const dateTime = new Date(dateValue);
      dateTime.setHours(Number(hours) + 1);
      dateTime.setMinutes(Number(minutes));

      const d = new Date(dateValue);
      d.setHours(Number(hours));
      d.setMinutes(Number(minutes));

      request.occurrenceDateTime = dateTime;
      request.exhibitions = this.selectedExhibitions;
      request.id = this.request.id;
      this.toursService.updateTourRequestAsGuest(request).subscribe({
        next: () => {
          this.showNotification('Tour request successfully updated!');
          this.dialogRef.close();
        },
      });
    }
    else{
      this.showNotification('Please fill out the form correctly!');
    }
  }

  overviewClicked() {
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
