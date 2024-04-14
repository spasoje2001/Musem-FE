import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToursService } from '../../tours.service';
import { PersonalTourRequest, PersonalTourRequestStatus } from '../../model/personalTourRequest.model';

@Component({
  selector: 'app-decline-request-prompt',
  templateUrl: './decline-request-prompt.component.html',
  styleUrls: ['./decline-request-prompt.component.css']
})
export class DeclineRequestPromptComponent implements OnInit{
  cancelButtonState: string = 'idle';   
  declineButtonState: string = 'idle'; 
  request: PersonalTourRequest | undefined;

  constructor(private toursService: ToursService,
              private dialogRef: MatDialogRef<DeclineRequestPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.request = data;
  }

  ngOnInit(): void {
    
  }

  declineButtonClicked(){
    this.declineButtonState = 'clicked'; 
    setTimeout(() => { this.declineButtonState = 'idle'; }, 200); 

    this.request!.status = PersonalTourRequestStatus.DECLINED;
    
    this.toursService.updateTourRequest(this.request!).subscribe({
      next: () => {
        this.dialogRef.close();
      }
    });
  }

  cancelButtonClicked(){
    this.cancelButtonState = 'clicked'; 
    setTimeout(() => { this.cancelButtonState = 'idle'; }, 200); 
    this.dialogRef.close();
  }

  overviewClicked(){
    this.dialogRef.close();
  }
}
