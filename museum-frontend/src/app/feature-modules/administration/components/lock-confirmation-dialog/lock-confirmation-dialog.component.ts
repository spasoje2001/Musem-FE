import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lock-confirmation-dialog',
  templateUrl: './lock-confirmation-dialog.component.html',
  styleUrls: ['./lock-confirmation-dialog.component.css']
})
export class LockConfirmationDialogComponent {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.isLocked) {
      this.title = `Unlock ${data.employeeName}`;
      this.message = "Are you sure you want to unlock this user's account?";
    } else {
      this.title = `Lock ${data.employeeName}`;
      this.message = "Are you sure you want to lock this user's account?";
    }
  }
}
