import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Cleaning } from '../model/cleaning.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CleaningService } from '../cleaning.service';

@Component({
  selector: 'app-cleaning-proposal-card',
  templateUrl: './cleaning-proposal-card.component.html',
  styleUrls: ['./cleaning-proposal-card.component.css'],
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
export class CleaningProposalCardComponent {
  acceptButtonState: string = 'idle';   
  declineButtonState: string = 'idle'; 
  @Input() cleaning!: Cleaning;
  private dialogRef: any;
  user: User | undefined;


  constructor(private dialog: MatDialog,
      private authService: AuthService, private cleaningService : CleaningService) {
          this.authService.user$.subscribe(user => {
          this.user = user;
    });
  }

  
  

  acceptButtonClicked(itemId : number) {
    if(this.user != null){
      this.cleaningService.acceptCleaning(itemId, this.user.id).subscribe();
    }
  }

  declineButtonClicked(itemId : number) {
    if(this.user != null){
      this.cleaningService.declineCleaning(itemId, this.user.id).subscribe();
    }
  }

  faCheck = faCheck;
  faTimes = faTimes;
}
