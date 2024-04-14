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
  sortKey = '';
  searchTerm = '';
  sortedEmployees: Employee[] = [];

  constructor(private dialog: MatDialog, private employeeManagementService: EmployeeManagementService){

  }

  ngOnInit(): void {
    this.employeeManagementService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = this.employees;
        this.sortedEmployees = this.employees;
      },
      (error) => {
        // Handle the error here
        console.error('There was an error!', error);
      }
    );
  }

  onFilterChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterEmployees();
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.sortEmployees();
    
  }

  onSortChange(sortKey: string): void {
    this.sortKey = sortKey;
    this.sortEmployees();
  }

  sortEmployees(): void{
    this.sortedEmployees = [...this.filteredEmployees].sort((a, b) => {
      switch (this.sortKey) {
        case 'name-asc':
          // Assuming 'name' is a concatenated string of 'firstName' and 'lastName'
          return (a.name).localeCompare(b.name);
        case 'name-desc':
          // Assuming 'name' is a concatenated string of 'firstName' and 'lastName'
          return (b.name).localeCompare(a.name);
        case 'role-asc':
          return a.role.localeCompare(b.role);
        case 'role-desc':
          return b.role.localeCompare(a.role);
        default:
          return 0; // If no sortKey or unrecognized sortKey, don't sort
      }
    });
  }

  toggleLockStatus(employeeId: number): void {
    this.employeeManagementService.toggleEmployeeLockStatus(employeeId).subscribe({
      next: (res) => {
        // Handle response here, e.g., refreshing the list or showing a message
        console.log('Lock status toggled', res);
        this.refreshEmployeeList(); // If you have a method to refresh the list
      },
      error: (error) => {
        // Handle error here
        console.error('Error toggling lock status', error);
      }
    });
  }

  private refreshEmployeeList(): void {
    // Call the method to refresh the list of employees
    this.employeeManagementService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filterEmployees();
        this.sortEmployees();
        console.log('uspeo');
        console.log(this.sortedEmployees);
      },
      (error) => {
        // Handle the error here
        console.error('There was an error!', error);
      }
    );
  }

  addEmployeeButtonClicked(){
    this.addEmployeeButtonState = 'clicked'; 
    setTimeout(() => { this.addEmployeeButtonState = 'idle'; }, 200);
    
    this.dialogRef = this.dialog.open(AddEmployeeFormComponent, {
    });
  }
}
