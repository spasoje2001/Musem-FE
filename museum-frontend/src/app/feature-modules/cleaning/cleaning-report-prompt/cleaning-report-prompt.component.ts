import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { CleaningService } from '../cleaning.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CleaningReport } from '../model/cleaningReport.model';

@Component({
  selector: 'app-cleaning-report-prompt',
  templateUrl: './cleaning-report-prompt.component.html',
  styleUrls: ['./cleaning-report-prompt.component.css'],
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
export class CleaningReportPromptComponent {
  cancelButtonState: string = 'idle';   
  acceptButtonState: string = 'idle'; 
  cleaningId: number | undefined;
  focused: string = '';
  user: User | undefined;

  constructor(private cleaningService: CleaningService,
      private snackBar: MatSnackBar, 
      private authService: AuthService,
      private dialogRef: MatDialogRef<CleaningReportPromptComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
          this.cleaningId = data;
          this.authService.user$.subscribe(user => {
          this.user = user;
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


  writeReportForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });

  finishCleaning(cleaningId:number){
    this.acceptButtonState = 'clicked'; 
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 
    this.cleaningService.finishCleaning(cleaningId).subscribe({
        next: () => {
            //poziv da se sacuva report
            const cleaningReport: CleaningReport = {
              text: this.writeReportForm.value.text || "",
              cleaningId: cleaningId,
              restaurateurId: this.user!.id
            };
            this.cleaningService.writeReport(cleaningReport).subscribe({
              next: () => {
                this.showNotification('Cleaning report successfully written!');
                this.dialogRef.close();
              }
            });
        }
      });
    }



}
