import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from '../../tours.service';
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TourPricelist } from '../../model/tourPricelist.model';

@Component({
  selector: 'app-tour-pricelist-view',
  templateUrl: './tour-pricelist-view.component.html',
  styleUrls: ['./tour-pricelist-view.component.css'],
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
export class TourPricelistViewComponent implements OnInit{
  buttonState: string = 'idle'; 
  tourPricelist: TourPricelist | undefined;

  constructor(private toursService: ToursService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddTourFormComponent>,
              private dialog: MatDialog,){
  }

  ngOnInit(): void {
    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist) => {
        this.tourPricelist = result;
      }
    })
  }

  editButtonClicked() {
    this.buttonState = 'clicked'; 
    setTimeout(() => { this.buttonState = 'idle'; }, 200); 


  }

  overviewClicked() {
    this.dialogRef.close();
  }
}
