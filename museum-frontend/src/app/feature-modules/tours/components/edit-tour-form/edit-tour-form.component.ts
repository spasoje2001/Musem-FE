import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { Tour } from '../../model/tour.model';
import { ToursService } from '../../tours.service';
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  focused: string = '';
  minDate: string;  
  tourImage: string | null = null;
  tourImageFile: File | null = null;
  curators: Curator[] = [];
  selectedCurator: Curator | undefined;
  @Input() tour: Tour;

  constructor(private toursService: ToursService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddTourFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
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
    adultTicketPrice: new FormControl('', [Validators.required]),
    minorTicketPrice: new FormControl('', [Validators.required]),
    //guide: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    picturePath: new FormControl('', [Validators.required]),
  });

  editTourButtonClicked() {
    const tour: Tour = {
      name: this.editTourForm.value.name || "",
      description: this.editTourForm.value.description || "",
      occurrenceDateTime: this.editTourForm.value.occurrenceDate || new Date(),
      adultTicketPrice: this.editTourForm.value.adultTicketPrice || "",
      minorTicketPrice: this.editTourForm.value.minorTicketPrice || "",
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

        if(this.selectedCurator != null){
          tour.guideId = this.selectedCurator.id;
        }
        else{
          tour.guideId = this.tour.guideId;
        }

        // za sad ovako dok s ene dodaju sobe
        tour.duration = "0";
        this.toursService.updateTour(tour).subscribe({
          next: () => {
            this.showNotification('Tour successfully edited!')
            this.dialogRef.close();
          },
        });
  }

  uploadImageButtonClicked() {

  }

  selectRouteButtonClicked() {
    
  }

  onSelectImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files && element.files[0]) {
        this.tourImageFile = element.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(this.tourImageFile);
        reader.onload = (e: ProgressEvent<FileReader>) => {
            this.tourImage = reader.result as string;
            //this.addTourForm.value.picturePath = "";
        };
    }
  }

  onChooseClicked(curator: Curator){
    this.selectedCurator = curator;
    this.showNotification('Curator successfully chosen!')
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
