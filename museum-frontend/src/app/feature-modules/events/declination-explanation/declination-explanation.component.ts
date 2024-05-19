import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventInvitation } from '../model/event-invitation.model';
import { EventService } from '../services/event.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InviteCuratorComponent } from '../invite-curator/invite-curator.component';
import { EventInvitationDeclination } from '../model/event-invitation-declination.model';

@Component({
  selector: 'app-declination-explanation',
  templateUrl: './declination-explanation.component.html',
  styleUrls: ['./declination-explanation.component.css', '../shared-styles.css']
})
export class DeclinationExplanationComponent {

  explanationForm = new FormGroup({
    explanation: new FormControl('', [Validators.required]),
  })

  constructor(
    private eventService: EventService,
    private dialogRef: MatDialogRef<InviteCuratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      eventInvitation: EventInvitation
    }
  ) { }

  onSubmit(): void {
    const explanation = this.explanationForm.value.explanation;
    const request: EventInvitationDeclination = {
      declinationExplanation: explanation!
    };
    this.eventService.declineInvitation(this.data.eventInvitation.id, request).subscribe({
      next: (result) => {
        this.dialogRef.close();
      }
    })
  }

}
