import {Component, Inject} from '@angular/core';
import {Cleaning} from "../model/cleaning.model";
import {CleaningService} from "../cleaning.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Organizer} from "../../stakeholder/model/organizer.model";
import {ToursService} from "../../tours/tours.service";
import {Curator} from "../../stakeholder/model/curator.model";

@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrls: ['./reject-reason.component.css']
})
export class RejectReasonComponent {
  closeButtonState: string = '';
  focused: string = '';
  cleaning: Cleaning | undefined;
  curator: Curator | undefined;
  denialReason: string = '';

  constructor(private service: CleaningService,
              private toursService: ToursService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RejectReasonComponent>,) {
    this.cleaning = data;

    this.toursService.getCuratorById(this.cleaning?.curator?.id!).subscribe({
      next: (result: Curator) => {
        this.curator = result;
        this.denialReason = this.curator?.firstName + ' ' + this.curator?.lastName + ' wrote: ' + this.cleaning?.denialReason;
      }
    })
  }

  closeButtonClicked() {
    this.closeButtonState = 'clicked';
    setTimeout(() => { this.closeButtonState = 'idle'; }, 200);
    this.dialogRef.close();
  }

  overviewClicked(){
    this.dialogRef.close();
  }
}
