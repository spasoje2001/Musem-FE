import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { EmployeesViewComponent } from "./components/employees-view/employees-view.component";
import { AddEmployeeFormComponent } from './components/add-employee-form/add-employee-form.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { SortDropdownComponent } from './components/sort-dropdown/sort-dropdown.component';
import { EditEmployeeFormComponent } from './components/edit-employee-form/edit-employee-form.component';
import { LockConfirmationDialogComponent } from './components/lock-confirmation-dialog/lock-confirmation-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    EmployeesViewComponent,
    AddEmployeeFormComponent,
    SearchFilterComponent,
    EmployeesTableComponent,
    SortDropdownComponent,
    EditEmployeeFormComponent,
    LockConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,  
    MaterialModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    EmployeesViewComponent
  ]
})
export class AdministrationModule { 

}