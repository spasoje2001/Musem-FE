import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-tour-prompt',
  templateUrl: './remove-tour-prompt.component.html',
  styleUrls: ['./remove-tour-prompt.component.css'],
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
export class RemoveTourPromptComponent {
  cancelButtonState: string = 'idle';   
  removeButtonState: string = 'idle'; 
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private dialogRef: MatDialogRef<RemoveTourPromptComponent>){

  }

  removeButtonClicked(){
    this.removeButtonState = 'clicked'; 
    setTimeout(() => { this.removeButtonState = 'idle'; }, 200); 
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
