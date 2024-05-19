import { Component, Input } from '@angular/core';
import { Event } from '../model/event.model';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css', '../shared-styles.css']
})
export class EventInfoComponent {

  @Input() event?: Event;

}
