import { Component, Input } from '@angular/core';
import { Event } from '../model/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  @Input() events: Event[] = [];

}
