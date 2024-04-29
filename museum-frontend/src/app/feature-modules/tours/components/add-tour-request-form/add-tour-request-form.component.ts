import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonalTourRequest, PersonalTourRequestStatus } from '../../model/personalTourRequest.model';
import { ToursService } from '../../tours.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'xp-add-tour-request-form',
  templateUrl: './add-tour-request-form.component.html',
  styleUrls: ['./add-tour-request-form.component.css'],
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
export class AddTourRequestFormComponent implements OnInit{
  routeButtonState: string = 'idle'; 
  submitButtonState: string = 'idle';
  focused: string = '';
  minDate: string;  
  
  constructor(private toursService: ToursService,
              private dialogRef: MatDialogRef<AddTourRequestFormComponent>,
              private snackBar: MatSnackBar,){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    
  }

  addTourRequestForm = new FormGroup({
    //duration: new FormControl('', [Validators.required]),
    occurrenceTime: new FormControl(null, [Validators.required]),
    occurrenceDate: new FormControl(null, [Validators.required]),
    guestNumber: new FormControl('', [Validators.required]),
  });

  selectRouteButtonClicked(){
    this.routeButtonState = 'clicked'; 
    setTimeout(() => { this.routeButtonState = 'idle'; }, 200); 
  }

  addTourRequestButtonClicked(){
    this.submitButtonState = 'clicked'; 
    setTimeout(() => { this.submitButtonState = 'idle'; }, 200); 

    const request: PersonalTourRequest = {
      occurrenceDateTime: this.addTourRequestForm.value.occurrenceDate || new Date(),
      guestNumber: this.addTourRequestForm.value.guestNumber || "",
      status: PersonalTourRequestStatus.IN_PROGRESS,
    };

    console.log(request);

    if (this.addTourRequestForm.valid) {
      this.submitButtonState = 'clicked'; 
      setTimeout(() => { this.submitButtonState = 'idle'; }, 200); 

      // Postavi datum i vreme 
      const dateValue: Date | null = this.addTourRequestForm.value.occurrenceDate!;
      const timeValue: string | null = this.addTourRequestForm.value.occurrenceTime!;

      const [hours, minutes] = (timeValue as string).split(':'); 
      const dateTime = new Date(dateValue);
      dateTime.setHours(Number(hours) + 1);
      dateTime.setMinutes(Number(minutes));

      const d = new Date(dateValue);
      d.setHours(Number(hours));
      d.setMinutes(Number(minutes));

      request.occurrenceDateTime = dateTime;

      this.toursService.addTourRequest(request).subscribe({
        next: () => {
          this.showNotification('Tour request successfully sent!');
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
