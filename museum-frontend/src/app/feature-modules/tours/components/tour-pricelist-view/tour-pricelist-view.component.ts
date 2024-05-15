import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from '../../tours.service';
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TourPricelist } from '../../model/tourPricelist.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  doneButtonState: string = 'idle'; 
  tourPricelist: TourPricelist | undefined;
  editClicked: boolean = false;
  focused: string = '';

  constructor(private toursService: ToursService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddTourFormComponent>,){
  }

  ngOnInit(): void {
    this.getPricelist();
  }

  getPricelist() {
    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist) => {
        this.tourPricelist = result;
      }
    })
  }

  editTourPricelistForm = new FormGroup({
    adultTicketPrice: new FormControl('', [Validators.required]),
    minorTicketPrice: new FormControl('', [Validators.required]),
  });

  editButtonClicked() {
    this.buttonState = 'clicked'; 
    setTimeout(() => { this.buttonState = 'idle'; }, 200); 
    this.editClicked = true;
  }

  doneButtonClicked() {
    this.doneButtonState = 'clicked'; 
    setTimeout(() => { this.doneButtonState = 'idle'; }, 200); 
    this.editClicked = false;

    const tourPricelist: TourPricelist = {
      id: 0,
      adultTicketPrice: this.editTourPricelistForm.value.adultTicketPrice || "",
      minorTicketPrice: this.editTourPricelistForm.value.minorTicketPrice || "",
    };

    this.toursService.updateTourPricelist(tourPricelist).subscribe({
      next: (response: any) => {
        this.getPricelist();
      }
    })
  }

  overviewClicked() {
    this.dialogRef.close();
  }

}
