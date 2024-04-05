import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeFormComponent } from '../add-employee-form/add-employee-form.component';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css']
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
      //data: contract,
    });
  }
}
