import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { Cleaning } from '../model/cleaning.model';
import { CleaningService } from '../cleaning.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {CleaningDeclineModel} from "../model/cleaning-decline.model";

@Component({
  selector: 'app-decline-cleaning-prompt',
  templateUrl: './decline-cleaning-prompt.component.html',
  styleUrls: ['./decline-cleaning-prompt.component.css'],
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
export class DeclineCleaningPromptComponent {
      cancelButtonState: string = 'idle';
      declineButtonState: string = 'idle';
      cleaning: Cleaning | undefined;
      user: User | undefined;
      focused: string = '';

      constructor(private cleaningService: CleaningService,
                  private authService: AuthService,
                  private snackBar: MatSnackBar,
                  private dialogRef: MatDialogRef<DeclineCleaningPromptComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any) {
        this.cleaning = data;
        this.authService.user$.subscribe(user => {
          this.user = user;
      });
    }

    declineRequestForm = new FormGroup({
      explanation: new FormControl('', [Validators.required]),
    });

    declineButtonClicked(cleaningId : number){
      this.declineButtonState = 'clicked';
      setTimeout(() => { this.declineButtonState = 'idle'; }, 200);
      if(this.user != null){

        const cleaning: CleaningDeclineModel = {
          cleaningId: cleaningId,
          curatorId: this.user.id,
          denialExplanation: this.declineRequestForm.value.explanation || ""
        }

        this.cleaningService.declineCleaning(cleaning).subscribe(
          {
            next: () => {
              this.showNotification('Cleaning proposal successfully declined!');
              this.dialogRef.close();
            }
        }
        );
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
