import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tour-form',
  templateUrl: './add-tour-form.component.html',
  styleUrls: ['./add-tour-form.component.css']
})
export class AddTourFormComponent implements OnInit{
  buttonState: string = 'idle'; 
  focused: string = '';

  constructor() {

  }

  ngOnInit(): void {
    
  }

  addTourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //duration: new FormControl('', [Validators.required]),
    occurrenceDateTime: new FormControl('', [Validators.required]),
    adultTicketPrice: new FormControl('', [Validators.required]),
    minorTicketPrice: new FormControl('', [Validators.required]),
    //guide: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
  });

  addTourButtonClicked() {

  }

  uploadImageButtonClicked() {

  }

  selectRouteButtonClicked() {
    
  }
}
