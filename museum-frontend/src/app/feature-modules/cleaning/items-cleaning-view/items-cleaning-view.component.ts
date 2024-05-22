import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CleaningService } from '../cleaning.service';
import { Item } from '../../items/model/item.model';
import { CleaningProposalFormComponent } from '../cleaning-proposal-form/cleaning-proposal-form.component';
import { Cleaning, CleaningStatus } from '../model/cleaning.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ItemsService } from '../../items/items.service';
import { CleaningReportPromptComponent } from '../cleaning-report-prompt/cleaning-report-prompt.component';
import {RejectReasonComponent} from "../reject-reason/reject-reason.component";
import { PdfCleaningPromptComponent } from '../pdf-cleaning-prompt/pdf-cleaning-prompt.component';
import { PdfPersonalCleaningPromptComponent } from '../pdf-personal-cleaning-prompt/pdf-personal-cleaning-prompt.component';

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
  @Input() cleaning!: Cleaning;
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();
  user: User | undefined;

  constructor(private dialog: MatDialog, private cleaningService: CleaningService, private authService: AuthService,private itemService: ItemsService){
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
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

  putToCleaning(cleaningId:number){
    this.acceptButtonState = 'clicked';
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200);
    this.cleaningService.putItemToCleaning(cleaningId).subscribe({
        next: () => {
          this.cleaningService.getItemsForCleaningHandling().subscribe({
            next: (result: Item[] | Item) => {
              if(Array.isArray(result)){
                this.items = result;
              }
            }
          });
        }
      });

  }

  //PROMENITI DA BUDE PROMPT ZA PISANJE REPORTA
  finishCleaning(cleaningId:number){
    /*this.acceptButtonState = 'clicked';
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200);
    this.cleaningService.finishCleaning(cleaningId).subscribe({
        next: () => {
          this.cleaningService.getItemsForCleaningHandling().subscribe({
            next: (result: Item[] | Item) => {
              if(Array.isArray(result)){
                this.items = result;
              }
            }
          });
        }
      });*/
      this.acceptButtonState = 'clicked';
      setTimeout(() => { this.acceptButtonState = 'idle'; }, 200);
      this.dialogRef = this.dialog.open(CleaningReportPromptComponent, {
        data: cleaningId
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

  seeReasonButtonClicked(cleaning: Cleaning) {
    this.dialogRef = this.dialog.open(RejectReasonComponent, {
      data: cleaning
    });
  }

  seeReportAllButtonClick(){

    this.dialogRef = this.dialog.open(PdfCleaningPromptComponent, {
    });
  }

  seeReportMyButtonClick(){
    this.dialogRef = this.dialog.open(PdfPersonalCleaningPromptComponent, {});
  }

}
