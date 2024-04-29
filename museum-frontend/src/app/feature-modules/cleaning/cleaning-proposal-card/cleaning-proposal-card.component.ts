import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Cleaning } from '../model/cleaning.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CleaningService } from '../cleaning.service';
import { AcceptCleaningPromptComponent } from '../accept-cleaning-prompt/accept-cleaning-prompt.component';
import { DeclineCleaningPromptComponent } from '../decline-cleaning-prompt/decline-cleaning-prompt.component';
import { ItemsService } from '../../items/items.service';
import { Item } from '../../items/model/item.model';

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
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();
  private dialogRef: any;
  user: User | undefined;
  item: Item | undefined;

  constructor(private dialog: MatDialog,
      private authService: AuthService, private cleaningService : CleaningService, private itemService: ItemsService) {
          this.authService.user$.subscribe(user => {
          this.user = user;
    });        
  }

  ngOnInit(){
    if(this.cleaning.itemId != null){
      this.itemService.getItem(this.cleaning.itemId).subscribe(item => {
        this.item = item;
      });
    }
  }
  

  acceptButtonClicked(cleaning : Cleaning) {
    this.acceptButtonState = 'clicked'; 
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(AcceptCleaningPromptComponent, {
      data: cleaning
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  declineButtonClicked(cleaning : Cleaning) {
    this.declineButtonState = 'clicked'; 
    setTimeout(() => { this.declineButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(DeclineCleaningPromptComponent, {
      data: cleaning
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  faCheck = faCheck;
  faTimes = faTimes;
}
