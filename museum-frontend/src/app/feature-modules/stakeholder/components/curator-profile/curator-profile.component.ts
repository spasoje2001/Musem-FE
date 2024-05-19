import { Component, OnInit } from '@angular/core';
import { Curator } from '../../model/curator.model';
import { CuratorService } from '../../services/curator.service';
import { EventService } from 'src/app/feature-modules/events/services/event.service';
import { EventInvitation } from 'src/app/feature-modules/events/model/event-invitation.model';
import { MatDialog } from '@angular/material/dialog';
import { DeclinationExplanationComponent } from 'src/app/feature-modules/events/declination-explanation/declination-explanation.component';

@Component({
  selector: 'app-curator-profile',
  templateUrl: './curator-profile.component.html',
  styleUrls: ['./curator-profile.component.css', '../shared-styles.css']
})
export class CuratorProfileComponent implements OnInit {

  curator?: Curator;
  pendingEventInvitations: EventInvitation[] = [];

  constructor(
    private curatorService: CuratorService,
    private eventService: EventService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadCurator();
    this.loadPendingInvites();
  }
  
  loadCurator(): void {
    this.curatorService.getLoggedInCurator().subscribe(curator => {
      this.curator = curator;
    });
  }

  loadPendingInvites(): void {
    this.eventService.getPendingInvitations().subscribe({
      next: (result) => {
        this.pendingEventInvitations = result;
      }
    })
  }

  onAccept(eventInvitation: EventInvitation): void {
    this.eventService.acceptInvitation(eventInvitation.id).subscribe({
      next: (result) => {
        this.loadData();
      }
    })
  }

  onDecline(eventInvitation: EventInvitation): void {
    const dialogRef = this.dialog.open(DeclinationExplanationComponent, {
      data: {
        eventInvitation: eventInvitation
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.loadData();
      }
    })
  }

}
