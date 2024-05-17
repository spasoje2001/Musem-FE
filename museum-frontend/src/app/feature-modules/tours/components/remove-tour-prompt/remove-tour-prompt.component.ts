import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToursService } from '../../tours.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  tourId: number = 0;
  @Output() closeModalEvent = new EventEmitter<void>();

    constructor(private dialogRef: MatDialogRef<RemoveTourPromptComponent>,
                private snackBar: MatSnackBar,
                private toursService: ToursService,
                @Inject(MAT_DIALOG_DATA) public data: any){
      this.tourId = data;
    }

  removeButtonClicked(){
    this.removeButtonState = 'clicked'; 
    setTimeout(() => { this.removeButtonState = 'idle'; }, 200); 
    this.toursService.deleteTour(this.tourId).subscribe({
      next: () => {
        this.showNotification('Tour is successfully removed!')
        this.dialogRef.close();
      }
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
}
