import { Component, Inject } from '@angular/core';
import { CuratorService } from '../../stakeholder/services/curator.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Event } from '../model/event.model';
import { Curator } from '../../stakeholder/model/curator.model';

@Component({
  selector: 'app-invite-curator',
  templateUrl: './invite-curator.component.html',
  styleUrls: ['./invite-curator.component.css', '../shared-styles.css']
})
export class InviteCuratorComponent {

  curator?: Curator;
  usernameExists: boolean = false;

  usernameForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  })

  constructor(
    private curatorService: CuratorService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<InviteCuratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      event: Event
    }
  ) { }

  onChange(): void {
    const username = this.usernameForm.value.username;
    if (username) {
      this.curatorService.existsByUsername(this.usernameForm.value.username!).subscribe({
        next: (result) => {
          this.usernameExists = result.value;
        }
      });
    }
  }

  onInvite(): void {
    const username = this.usernameForm.value.username;
    this.curatorService.getCuratorByUsername(username!).subscribe({
      next: (result) => {
        this.eventService.inviteParticipant(this.data.event.id, result.id).subscribe({
          next: (result) => {
            this.dialogRef.close();
          }
        });
      }
    })
  }

}
