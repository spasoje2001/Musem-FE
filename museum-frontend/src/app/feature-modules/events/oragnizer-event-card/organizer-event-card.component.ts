import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../model/event.model';

@Component({
  selector: 'app-organizer-event-card',
  templateUrl: './organizer-event-card.component.html',
  styleUrls: ['./organizer-event-card.component.css', '../shared-styles.css']
})
export class OrganizerEventCardComponent {

  @Input() event?: Event;

  @Output() deleted: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() published: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() archived: EventEmitter<Event> = new EventEmitter<Event>();


  onDeleteClick(): void {
    this.deleted.emit(this.event);
  }

  onPublishClick(): void {
    this.published.emit(this.event);
  }

  onArchiveClick(): void {
    this.archived.emit(this.event);
  }

}
