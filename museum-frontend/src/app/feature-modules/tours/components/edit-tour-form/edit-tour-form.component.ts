import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { Tour } from '../../model/tour.model';
import { ToursService } from '../../tours.service';
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TourPricelist} from "../../model/tourPricelist.model";
import {CuratorChoosingDialogueComponent} from "../curator-choosing-dialogue/curator-choosing-dialogue.component";
import {
  ExhibitionChoosingDialogueComponent
} from "../exhibition-choosing-dialogue/exhibition-choosing-dialogue.component";
import {Exhibition} from "../../../exhibitions/model/exhibition.model";

@Component({
  selector: 'app-edit-tour-form',
  templateUrl: './edit-tour-form.component.html',
  styleUrls: ['./edit-tour-form.component.css'],
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
export class EditTourFormComponent implements OnChanges{
  buttonState: string = 'idle';
  selectCuratorbuttonState: string = 'idle';
  selectRoutebuttonState: string = 'idle';
  focused: string = '';
  minDate: string;
  tourImage: string | null = null;
  tourImageFile: File | null = null;
  curators: Curator[] = [];
  selectedCurator: Curator[] = [];
  selectedExhibitions: Exhibition[] = [];
  @Input() tour: Tour;
  tourPricelist: TourPricelist | undefined;
  private ownDialogRef: any;
  adultTicketPrice: string = "0";
  minorTicketPrice: string = "0";

  constructor(private toursService: ToursService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddTourFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,) {
    this.tour = data;
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.toursService.getCurators().subscribe({
      next: (result: Curator[] | Curator) => {
        if (Array.isArray(result)) {
          this.curators = result;
          console.log(this.curators);
        }
      }
    })

    this.toursService.getTourPricelist().subscribe({
      next: (result: TourPricelist) => {
        this.tourPricelist = result;
      }
    })

    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.editTourForm.reset();
          const tourToPatch = {
            name: this.tour.name || "",
            description: this.tour.description || "",
            occurrenceDateTime: this.tour.occurrenceDateTime || new Date(),
            adultTicketPrice: this.tour.adultTicketPrice || "",
            minorTicketPrice: this.tour.minorTicketPrice || "",
            capacity: this.tour.capacity || "",
            picturePath: this.tour.picturePath || "",
          };
          this.editTourForm.patchValue(tourToPatch);
        }

  editTourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //duration: new FormControl('', [Validators.required]),
    occurrenceTime: new FormControl(null, [Validators.required]),
    occurrenceDate: new FormControl(null, [Validators.required]),
    //guide: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    picturePath: new FormControl('', [Validators.required]),
  });

  editTourButtonClicked() {
    const tour: Tour = {
      name: this.editTourForm.value.name || "",
      description: this.editTourForm.value.description || "",
      occurrenceDateTime: this.editTourForm.value.occurrenceDate || new Date(),
      adultTicketPrice: this.tourPricelist?.adultTicketPrice || "",
      minorTicketPrice: this.tourPricelist?.minorTicketPrice || "",
      capacity: this.editTourForm.value.capacity || "",
      picturePath: this.editTourForm.value.picturePath || "",
    };

        tour.id = this.tour.id;
        console.log(tour);

        this.buttonState = 'clicked';
        setTimeout(() => { this.buttonState = 'idle'; }, 200);

        if(this.editTourForm.value.occurrenceDate && this.editTourForm.value.occurrenceTime){
          // Postavi datum i vreme
          const dateValue: Date | null = this.editTourForm.value.occurrenceDate!;
          const timeValue: string | null = this.editTourForm.value.occurrenceTime!;

          const [hours, minutes] = (timeValue as string).split(':');
          const dateTime = new Date(dateValue);
          dateTime.setHours(Number(hours) + 1);
          dateTime.setMinutes(Number(minutes));

          const d = new Date(dateValue);
          d.setHours(Number(hours));
          d.setMinutes(Number(minutes));

          tour.occurrenceDateTime = dateTime;
        }
        else{
          tour.occurrenceDateTime = this.tour.occurrenceDateTime;
        }

        if(this.selectedCurator.length != 0){
          tour.guideId = this.selectedCurator[0].id;
        }
        else{
          tour.guideId = this.tour.guide?.id;
        }

        if(this.selectedExhibitions.length != 0){
          tour.exhibitions = this.selectedExhibitions;
        }
        else{
          tour.exhibitions = this.tour.exhibitions;
        }

        // setuje se na beku
        tour.duration = "0";
        this.toursService.updateTour(tour).subscribe({
          next: () => {
            this.showNotification('Tour successfully edited!')
            this.dialogRef.close();
          },
        });
  }

  selectRouteButtonClicked() {
    this.selectRoutebuttonState = 'clicked';
    setTimeout(() => { this.selectRoutebuttonState = 'idle'; }, 200);
    this.ownDialogRef = this.dialog.open(ExhibitionChoosingDialogueComponent, {
      data: this.selectedExhibitions
    });
    this.ownDialogRef.afterClosed().subscribe((result: any) => {
      console.log('Odabrao si egzibicije: ' + this.selectedExhibitions);
      this.adultTicketPrice = (this.selectedExhibitions.length * Number(this.tourPricelist?.adultTicketPrice)).toString();
      this.minorTicketPrice = (this.selectedExhibitions.length * Number(this.tourPricelist?.minorTicketPrice)).toString();

      console.log('Adult ticket price: ' + this.adultTicketPrice);
      console.log('Minor ticket price: ' + this.minorTicketPrice);
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
