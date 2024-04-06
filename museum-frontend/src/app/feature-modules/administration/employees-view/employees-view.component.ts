import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeFormComponent } from '../add-employee-form/add-employee-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css'],
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
  ]
})
export class EmployeesViewComponent {
  addEmployeeButtonState: string = 'idle'; 
  private dialogRef: any;

  constructor(private dialog: MatDialog){

  }

  addEmployeeButtonClicked(){
    this.addEmployeeButtonState = 'clicked'; 
    setTimeout(() => { this.addEmployeeButtonState = 'idle'; }, 200);
    
    this.dialogRef = this.dialog.open(AddEmployeeFormComponent, {
    });
  }
}
