import { Component, Input } from '@angular/core';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  @Input() employees: Employee[] = [];
  
}
