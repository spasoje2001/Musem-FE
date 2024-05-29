import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ItemsService } from '../../items/items.service';
import { Item } from '../../items/model/item.model';
import { CleaningService } from '../cleaning.service';
import { CleaningJournal } from '../model/cleaning-journal.model';

@Component({
  selector: 'app-cleaning-journal',
  templateUrl: './cleaning-journal.component.html',
  styleUrls: ['./cleaning-journal.component.css'],
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
export class CleaningJournalComponent {
  @Input() journal!: CleaningJournal;
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
    if(this.journal.itemId != null){
      this.itemService.getItem(this.journal.itemId).subscribe(item => {
        this.item = item;
      });
    }
  }

}
