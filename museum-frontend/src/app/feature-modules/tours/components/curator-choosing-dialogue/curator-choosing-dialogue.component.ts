import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { ToursService } from '../../tours.service';

@Component({
  selector: 'app-curator-choosing-dialogue',
  templateUrl: './curator-choosing-dialogue.component.html',
  styleUrls: ['./curator-choosing-dialogue.component.css'],
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
export class CuratorChoosingDialogueComponent implements OnInit{
  curators: Curator[] = [];
  selectedCurator: Curator | undefined;
  doneButtonState: string = 'idle';
  chooseButtonState: string = 'idle';

  constructor(private dialogRef: MatDialogRef<CuratorChoosingDialogueComponent>,
              private snackBar: MatSnackBar,
              private toursService: ToursService,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.selectedCurator = data;
  }

  ngOnInit(): void {
    this.toursService.getCurators().subscribe({
      next: (result: Curator[] | Curator) => {
        if(Array.isArray(result)){
          this.curators = result;
        }
      }
    });
  }

  onChooseClicked(curator: Curator){
    this.selectedCurator = curator;
    this.showNotification('Curator successfully chosen!');
  }

  onRemoveClicked(){
    this.selectedCurator = undefined;
    this.showNotification('Curator successfully removed!');
  }

  isSelected(curator: Curator): boolean {
    if(this.selectedCurator){
      return this.selectedCurator == curator;
    }
    return false;
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
