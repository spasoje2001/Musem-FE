import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { Cleaning } from '../model/cleaning.model';
import { CleaningService } from '../cleaning.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-accept-cleaning-prompt',
  templateUrl: './accept-cleaning-prompt.component.html',
  styleUrls: ['./accept-cleaning-prompt.component.css'],
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
export class AcceptCleaningPromptComponent {

  cancelButtonState: string = 'idle';   
  acceptButtonState: string = 'idle'; 
  cleaning: Cleaning | undefined;
  focused: string = '';
  user: User | undefined;

  constructor(private cleaningService: CleaningService, private authService: AuthService,
    private dialogRef: MatDialogRef<AcceptCleaningPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cleaning = data;
    this.authService.user$.subscribe(user => {
      this.user = user;
  });
}


  acceptButtonClicked(cleaningId : number){
      this.acceptButtonState = 'clicked'; 
      setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 
      if(this.user != null){
        this.cleaningService.acceptCleaning(cleaningId, this.user.id).subscribe({
          next: () => {
            this.dialogRef.close();
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

}
