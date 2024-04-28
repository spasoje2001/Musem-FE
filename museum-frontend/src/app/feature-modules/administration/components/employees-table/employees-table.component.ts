import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { faLock, faUnlock, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToggleLockEvent } from '../../model/toggle-lock.model';


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  @Input() employees: Employee[] = [];
  @Output() toggleLock = new EventEmitter<ToggleLockEvent>();
  @Output() editEmployee = new EventEmitter<number>();
  
  onToggleLock(employeeId: number, name: string, isAccountLocked: boolean): void {
    this.toggleLock.emit({ employeeId, name, isAccountLocked });
  }

  onEditEmployeeClicked(employeeId: number): void {
    console.log(employeeId);
    this.editEmployee.emit(employeeId);
  }

  faLock = faLock;
  faUnlock = faUnlock;
  faPen = faPen;

}
