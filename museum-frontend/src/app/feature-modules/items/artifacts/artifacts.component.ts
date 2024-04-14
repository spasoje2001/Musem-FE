import { Component } from '@angular/core';
import { ArtifactFormComponent } from '../artifact-form/artifact-form.component';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css'],
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
export class ArtifactsComponent {
  addItemButtonState: string = 'idle'; 
  private dialogRef: any;

  constructor(private dialog: MatDialog){

  }

  addItemButtonClicked(){
    this.addItemButtonState = 'clicked'; 
    setTimeout(() => { this.addItemButtonState = 'idle'; }, 200);
    
    this.dialogRef = this.dialog.open(ArtifactFormComponent, {
    });
  }
}
