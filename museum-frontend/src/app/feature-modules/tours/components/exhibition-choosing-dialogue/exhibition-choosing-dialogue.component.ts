import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from '../../tours.service';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { Exhibition } from 'src/app/feature-modules/exhibitions/model/exhibition.model';

@Component({
  selector: 'app-exhibition-choosing-dialogue',
  templateUrl: './exhibition-choosing-dialogue.component.html',
  styleUrls: ['./exhibition-choosing-dialogue.component.css']
})
export class ExhibitionChoosingDialogueComponent implements OnInit{
  exhibitions: Exhibition[] = [];
  selectedExhibitions: Exhibition[] = [];
  doneButtonState: string = 'idle'; 

  constructor(private dialogRef: MatDialogRef<ExhibitionChoosingDialogueComponent>,
              private snackBar: MatSnackBar,
              private toursService: ToursService,
              @Inject(ExhibitionsService) private exhibitionsService: ExhibitionsService){              
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
  }

  doneButtonClicked(){
    this.dialogRef.close();
    this.showNotification('Exhibitions successfully chosen!');
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
