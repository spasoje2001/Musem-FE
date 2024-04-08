import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { EmployeesViewComponent } from "./employees-view/employees-view.component";
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';

@NgModule({
  declarations: [
    EmployeesViewComponent,
    AddEmployeeFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,  
    MaterialModule
  ],
  exports: [
    EmployeesViewComponent
  ]
})
export class AdministrationModule { 

}