import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { Tour } from '../../model/tour.model';
import { ToursService } from '../../tours.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExhibitionChoosingDialogueComponent } from '../exhibition-choosing-dialogue/exhibition-choosing-dialogue.component';
import { Exhibition } from 'src/app/feature-modules/exhibitions/model/exhibition.model';
import { CuratorChoosingDialogueComponent } from '../curator-choosing-dialogue/curator-choosing-dialogue.component';
import {TourPricelist} from "../../model/tourPricelist.model";

@Component({
  selector: 'app-add-tour-form',
  templateUrl: './add-tour-form.component.html',
  styleUrls: ['./add-tour-form.component.css'],
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
export class AddTourFormComponent implements OnInit{
  buttonState: string = 'idle';
  selectCuratorbuttonState: string = 'idle';
  selectRoutebuttonState: string = 'idle';
  focused: string = '';
  minDate: string;
  selectedCurator: Curator[] = [];
  selectedExhibitions: Exhibition[] = [];
  private ownDialogRef: any;
  tourPricelist: TourPricelist | undefined;

  constructor(private toursService: ToursService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddTourFormComponent>,
              private dialog: MatDialog,) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist) => {
        this.tourPricelist = result;
      }
    })
  }

  addTourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //duration: new FormControl('', [Validators.required]),
    occurrenceTime: new FormControl(null, [Validators.required]),
    occurrenceDate: new FormControl(null, [Validators.required]),
    //guide: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    picturePath: new FormControl('', [Validators.required]),
  });

  addTourButtonClicked() {
    const tour: Tour = {
      name: this.addTourForm.value.name || "",
      description: this.addTourForm.value.description || "",
      occurrenceDateTime: this.addTourForm.value.occurrenceDate || new Date(),
      adultTicketPrice: this.tourPricelist?.adultTicketPrice || "",
      minorTicketPrice: this.tourPricelist?.minorTicketPrice || "",
      capacity: this.addTourForm.value.capacity || "",
      picturePath: this.addTourForm.value.picturePath || "",
    };

    console.log(tour);

    if (this.addTourForm.valid) {
        this.buttonState = 'clicked';
        setTimeout(() => { this.buttonState = 'idle'; }, 200);

        // Postavi datum i vreme
        const dateValue: Date | null = this.addTourForm.value.occurrenceDate!;
        const timeValue: string | null = this.addTourForm.value.occurrenceTime!;

        const [hours, minutes] = (timeValue as string).split(':');
        const dateTime = new Date(dateValue);
        dateTime.setHours(Number(hours) + 1);
        dateTime.setMinutes(Number(minutes));

        const d = new Date(dateValue);
        d.setHours(Number(hours));
        d.setMinutes(Number(minutes));

        tour.occurrenceDateTime = dateTime;

        if(this.selectedCurator.length != 0){
          tour.guideId = this.selectedCurator[0].id;
          if(this.selectedExhibitions.length != 0){
            tour.duration = (this.selectedExhibitions.length * 15).toString();
            tour.exhibitions = this.selectedExhibitions;
            this.toursService.addTour(tour).subscribe({
              next: () => {
                this.showNotification('Tour successfully added!')
                this.dialogRef.close();
              },
            });
          }
          else{
            this.showNotification('Please select at least one exhibition')
          }
        }
        else{
          this.showNotification('Please select a curator')
        }
    }
    else{
      this.showNotification('Please fill out the form correctly')
    }
  }

  selectRouteButtonClicked() {
    this.selectRoutebuttonState = 'clicked';
    setTimeout(() => { this.selectRoutebuttonState = 'idle'; }, 200);
    this.ownDialogRef = this.dialog.open(ExhibitionChoosingDialogueComponent, {
      data: this.selectedExhibitions
    });
    this.ownDialogRef.afterClosed().subscribe((result: any) => {
      console.log('Odabrao si egzibicije: ' + this.selectedExhibitions);
    });
  }

  selectCuratorButtonClicked() {
    this.selectCuratorbuttonState = 'clicked';
    setTimeout(() => { this.selectCuratorbuttonState = 'idle'; }, 200);
    this.ownDialogRef = this.dialog.open(CuratorChoosingDialogueComponent, {
      data: this.selectedCurator
    });
    this.ownDialogRef.afterClosed().subscribe((result: any) => {
      console.log('Odabrao si kuratora: ' + this.selectedCurator);
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  overviewClicked(){
    this.dialogRef.close();
  }

}
