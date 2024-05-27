import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../model/organizer.model';
import { OrganizerService } from '../../services/organizer.service';
import { EventService } from 'src/app/feature-modules/events/services/event.service';
import { Event } from 'src/app/feature-modules/events/model/event.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InviteCuratorComponent } from 'src/app/feature-modules/events/invite-curator/invite-curator.component';
import { EventInvitation } from 'src/app/feature-modules/events/model/event-invitation.model';
import { ExhibitionsService } from 'src/app/feature-modules/exhibitions/exhibitions.service';
import { ProposeExhibitionComponent } from 'src/app/feature-modules/exhibitions/propose-exhibition/propose-exhibition.component';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css', '../shared-styles.css']
})
export class OrganizerProfileComponent implements OnInit {

  organizer?: Organizer;
  events: Event[] = [];
  respondedEventInvitations: EventInvitation[] = [];
  pendingEventInvitations: EventInvitation[] = [];
  isExhibitionProposalFormOpen = false;

  constructor(
    private guestService: OrganizerService,
    private eventService: EventService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.guestService.getLoggedInOrganizer().subscribe(organizer => {
      this.organizer = organizer;
      this.loadEvents();
    });
    this.loadPendingInvites();
    this.loadRespondedInvites();
  }

  loadEvents(): void {
    this.eventService.getEventsByOrganizer().subscribe(events => {
      this.events = events;
    })
  }

  loadPendingInvites(): void {
    this.eventService.getPendingInvitations().subscribe({
      next: (result) => {
        this.pendingEventInvitations = result;
      }
    })
  }

  loadRespondedInvites(): void {
    this.eventService.getRespondedInvitations().subscribe({
      next: (result) => {
        this.respondedEventInvitations = result;
      }
    })
  }

  onDelete(event: Event): void {
    this.eventService.deleteEvent(event).subscribe(() => {
      this.loadEvents();
    })
  }

  onPublish(event: Event): void {
    this.eventService.publishEvent(event).subscribe(() => {
      this.loadEvents();
    })
  }

  onArchive(event: Event): void {
    this.eventService.archiveEvent(event).subscribe(() => {
      this.loadEvents();
    })
  }

  onCancel(eventInvitation: EventInvitation): void {
    this.eventService.cancelInvitation(eventInvitation.id).subscribe({
      next: (result) => {
        this.loadData();
      }
    })
  }

  onInviteParticipant(event: Event): void {
    const dialogRef = this.dialog.open(InviteCuratorComponent, {
      data: {
        event: event
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.loadData();
      }
    })
  }

  openExhibitionProposalForm() {
    const dialogRef = this.dialog.open(ProposeExhibitionComponent, {
      width: '250px',
      data: {
        organizerId: this.organizer!.id  // Pass the organizer's ID to the dialog
      }
      // Pass any required data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result from the dialog, which could be the new exhibition
      console.log('The dialog was closed', result);
    });
  }

}
