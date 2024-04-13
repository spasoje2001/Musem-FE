import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tour } from '../model/tour.model';
import { ToursService } from '../tours.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-add-tour-form',
  templateUrl: './add-tour-form.component.html',
  styleUrls: ['./add-tour-form.component.css']
})
export class AddTourFormComponent implements OnInit{
  buttonState: string = 'idle'; 
  focused: string = '';
  minDate: string;  
  tourImage: string | null = null;
  tourImageFile: File | null = null;
  curators: User[] = [];

  constructor(private tourService: ToursService, private dialogRef: MatDialogRef<AddTourFormComponent>) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    
  }

  ngOnInit(): void {
    this.tourService.getCurators().subscribe({
      next: (result: User[] | User) => {
        if (Array.isArray(result)) {
          this.curators = result;
        }
      }
    })
  }

  addTourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //duration: new FormControl('', [Validators.required]),
    occurrenceTime: new FormControl(null, [Validators.required]),
    occurrenceDate: new FormControl(null, [Validators.required]),
    adultTicketPrice: new FormControl('', [Validators.required]),
    minorTicketPrice: new FormControl('', [Validators.required]),
    guide: new FormControl('', [Validators.required]),
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

        this.tourService.addTour(tour).subscribe({
          next: () => {
            this.dialogRef.close();
          },
        });
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
            this.addTourForm.value.picturePath = "";
        };
    }
  }

  onAddAdminClicked(user: User){

  }
}
