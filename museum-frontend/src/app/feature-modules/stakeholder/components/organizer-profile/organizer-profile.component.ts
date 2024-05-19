import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../model/organizer.model';
import { OrganizerService } from '../../services/organizer.service';
import { EventService } from 'src/app/feature-modules/events/services/event.service';
import { Event } from 'src/app/feature-modules/events/model/event.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InviteCuratorComponent } from 'src/app/feature-modules/events/invite-curator/invite-curator.component';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css', '../shared-styles.css']
})
export class OrganizerProfileComponent implements OnInit {

  organizer?: Organizer;
  events: Event[] = [];

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
  }

  loadEvents(): void {
    this.eventService.getEventsByOrganizer().subscribe(events => {
      this.events = events;
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

  onInviteParticipant(event: Event): void {
    this.dialog.open(InviteCuratorComponent, {
      data: {
        event: event
      }
    });
  }

}
