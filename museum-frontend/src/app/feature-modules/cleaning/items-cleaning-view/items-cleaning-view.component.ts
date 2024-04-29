import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CleaningService } from '../cleaning.service';
import { Item } from '../../items/model/item.model';
import { CleaningProposalFormComponent } from '../cleaning-proposal-form/cleaning-proposal-form.component';
import { CleaningStatus } from '../model/cleaning.model';

@Component({
  selector: 'app-items-cleaning-view',
  templateUrl: './items-cleaning-view.component.html',
  styleUrls: ['./items-cleaning-view.component.css'],
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
  ]
})
export class ItemsCleaningViewComponent {

  private dialogRef: any;
  items: Item[] = [];
  acceptButtonState: string = 'idle';   
  declineButtonState: string = 'idle'; 
  constructor(private dialog: MatDialog, private cleaningService: CleaningService){

  }

  ngOnInit(): void {
    this.cleaningService.getItemsForCleaningHandling().subscribe({
      next: (result: Item[] | Item) => {
        if(Array.isArray(result)){
          this.items = result;
        }
      }
    });
  }

  writeProposal(itemId:number){
    this.acceptButtonState = 'clicked'; 
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(CleaningProposalFormComponent, {
      data: itemId
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.cleaningService.getItemsForCleaningHandling().subscribe({
        next: (result: Item[] | Item) => {
          if(Array.isArray(result)){
            this.items = result;
          }
        }
      });
    });
  }

}
