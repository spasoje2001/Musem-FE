import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeFormComponent } from '../add-employee-form/add-employee-form.component';
import { EmployeesTableComponent } from '../employees-table/employees-table.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SortDropdownComponent } from '../sort-dropdown/sort-dropdown.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EmployeeManagementService } from '../../service/employee-management.service';
import { Employee } from '../../model/employee.model';

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
export class EmployeesViewComponent implements OnInit {
  addEmployeeButtonState: string = 'idle'; 
  private dialogRef: any;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(private dialog: MatDialog, private employeeManagementService: EmployeeManagementService){

  }

  ngOnInit(): void {
    this.employeeManagementService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = this.employees;
      },
      (error) => {
        // Handle the error here
        console.error('There was an error!', error);
      }
    );
  }

  onFilterChange(searchTerm: string): void {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addEmployeeButtonClicked(){
    this.addEmployeeButtonState = 'clicked'; 
    setTimeout(() => { this.addEmployeeButtonState = 'idle'; }, 200);
    
    this.dialogRef = this.dialog.open(AddEmployeeFormComponent, {
    });
  }
}
