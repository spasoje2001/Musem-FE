import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { Tour } from '../../model/tour.model';
import { ToursService } from '../../tours.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  focused: string = '';
  minDate: string;  
  tourImage: string | null = null;
  tourImageFile: File | null = null;
  curators: Curator[] = [];
  selectedCurator: Curator | undefined;

  constructor(private toursService: ToursService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddTourFormComponent>) {
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
  }

  ngOnInit(): void {
    
  }

  addTourForm = new FormGroup({
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

  addTourButtonClicked() {
    const tour: Tour = {
      name: this.addTourForm.value.name || "",
      description: this.addTourForm.value.description || "",
      occurrenceDateTime: this.addTourForm.value.occurrenceDate || new Date(),
      adultTicketPrice: this.addTourForm.value.adultTicketPrice || "",
      minorTicketPrice: this.addTourForm.value.minorTicketPrice || "",
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

        if(this.selectedCurator != null){
          //tour.guide = this.selectedCurator;
          tour.guideId = this.selectedCurator.id;
          // za sad ovako dok s ene dodaju sobe
          tour.duration = "0";
          this.toursService.addTour(tour).subscribe({
            next: () => {
              this.showNotification('Tour successfully added!')
              this.dialogRef.close();
            },
          });
        }
    }
    else{
      console.log('Add tour form not valid!'); // Treba dodati neki vid validacije
    }
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
