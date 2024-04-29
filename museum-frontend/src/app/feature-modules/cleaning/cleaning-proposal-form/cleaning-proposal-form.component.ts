import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { CleaningService } from '../cleaning.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cleaning, CleaningStatus } from '../model/cleaning.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cleaning-proposal-form',
  templateUrl: './cleaning-proposal-form.component.html',
  styleUrls: ['./cleaning-proposal-form.component.css'],
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
export class CleaningProposalFormComponent {
  buttonState: string = 'idle'; 
  focused: string = '';
  itemId: number;
  minDate: string;  

  constructor(private cleaningService: CleaningService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<CleaningProposalFormComponent>,  
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.itemId = data;
      const today = new Date();
      this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    
  }

  addCleaningForm = new FormGroup({
    tekst: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  addCleaningButtonClicked() {
    const cleaning: Cleaning = {
      text: this.addCleaningForm.value.tekst || "",
      startDate: this.addCleaningForm.value.startDate || "",
      endDate: this.addCleaningForm.value.endDate || "",
      status:  CleaningStatus.NEW,
    };

    console.log(cleaning);

    this.buttonState = 'clicked'; 
    setTimeout(() => { this.buttonState = 'idle'; }, 200); 

    const startDateString = new Date(cleaning.startDate);
    const endDateString = new Date(cleaning.endDate);

    if(endDateString > startDateString){
      this.cleaningService.addCleaning(this.itemId, cleaning).subscribe({
        next: () => {
          this.showNotification('Item successfully added to cleaning!');
          this.dialogRef.close();
        },
      });
    }
    else{
      this.showNotification('End date must be after start date!');
    }
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
