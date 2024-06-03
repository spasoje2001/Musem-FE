import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import {Tour, TourCategory} from '../../model/tour.model';
import { ToursService } from '../../tours.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExhibitionChoosingDialogueComponent } from '../exhibition-choosing-dialogue/exhibition-choosing-dialogue.component';
import { Exhibition } from 'src/app/feature-modules/exhibitions/model/exhibition.model';
import { CuratorChoosingDialogueComponent } from '../curator-choosing-dialogue/curator-choosing-dialogue.component';
import {TourPricelist} from "../../model/tourPricelist.model";
import {ItemCategory} from "../../../items/model/item.model";

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
  adultTicketPrice: string = "0";
  minorTicketPrice: string = "0";

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
    category: new FormControl('', [Validators.required]),
  });

  addTourButtonClicked() {
    const selectedCategoryString: string = this.addTourForm.value.category ?? '';
    let selectedCategory: TourCategory;

    switch (selectedCategoryString) {
      case 'ART_COLLECTIONS':
        selectedCategory = TourCategory.ArtCollections;
        break;
      case 'HISTORICAL_EXHIBITS':
        selectedCategory = TourCategory.HistoricalExhibits;
        break;
      case 'SCIENCE_AND_TECHNOLOGY':
        selectedCategory = TourCategory.ScienceAndTechnology;
        break;
      case 'CULTURAL_HERITAGE':
        selectedCategory = TourCategory.CulturalHeritage;
        break;
      case 'ANCIENT_ART':
        selectedCategory = TourCategory.AncientArt;
        break;
      case 'EUROPEAN_PAINTINGS':
        selectedCategory = TourCategory.EuropeanPaintings;
        break;
      case 'MODERN_ART':
        selectedCategory = TourCategory.ModernArt;
        break;
      case 'AMERICAN_ART':
        selectedCategory = TourCategory.AmericanArt;
        break;
      case 'ASIAN_ART':
        selectedCategory = TourCategory.AsianArt;
        break;
      case 'AFRICAN_CULTURE':
        selectedCategory = TourCategory.AfricanCulture;
        break;
      case 'ISLAMIC_ART':
        selectedCategory = TourCategory.IslamicArt;
        break;
      case 'COSTUME_INSTITUTE':
        selectedCategory = TourCategory.CostumeInstitute;
        break;
      case 'ARMS_AND_ARMOR':
        selectedCategory = TourCategory.ArmsAndArmor;
        break;
      default:
        console.error("Invalid category selected.");
        return;
    }

    const tour: Tour = {
      name: this.addTourForm.value.name || "",
      description: this.addTourForm.value.description || "",
      occurrenceDateTime: this.addTourForm.value.occurrenceDate || new Date(),
      adultTicketPrice: this.adultTicketPrice || "",
      minorTicketPrice: this.minorTicketPrice || "",
      capacity: this.addTourForm.value.capacity || "",
      picturePath: this.addTourForm.value.picturePath || "",
      category: selectedCategory,
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
