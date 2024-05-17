import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from '../../tours.service';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { Exhibition } from 'src/app/feature-modules/exhibitions/model/exhibition.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-exhibition-choosing-dialogue',
  templateUrl: './exhibition-choosing-dialogue.component.html',
  styleUrls: ['./exhibition-choosing-dialogue.component.css'],
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
export class ExhibitionChoosingDialogueComponent implements OnInit{
  exhibitions: Exhibition[] = [];
  selectedExhibitions: Exhibition[] = [];
  doneButtonState: string = 'idle';
  chooseButtonState: string = 'idle';

  constructor(private dialogRef: MatDialogRef<ExhibitionChoosingDialogueComponent>,
              private snackBar: MatSnackBar,
              private toursService: ToursService,
              @Inject(ExhibitionsService) private exhibitionsService: ExhibitionsService,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.selectedExhibitions = data;
  }

  ngOnInit(): void {
    this.exhibitionsService.getExhibitions().subscribe({
      next: (result: Exhibition[] | Exhibition) => {
        if(Array.isArray(result)){
          this.exhibitions = result;
        }
      }
    });
  }

  onChooseClicked(exhibition: Exhibition){
    this.selectedExhibitions.push(exhibition);
    this.showNotification('Exhibition successfully chosen!');
  }

  onRemoveClicked(exhibitionToRemove: Exhibition){
    this.selectedExhibitions = this.selectedExhibitions.filter(exhibition => exhibition.id !== exhibitionToRemove.id);
    this.showNotification('Exhibition successfully removed!');
  }

  isSelected(exhibition: Exhibition): boolean {
    return this.selectedExhibitions.includes(exhibition);
  }

  doneButtonClicked(){
    this.doneButtonState = 'clicked'; 
    setTimeout(() => { this.doneButtonState = 'idle'; }, 200); 
    this.dialogRef.close();
    this.showNotification('Your picks have been saved!');
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
