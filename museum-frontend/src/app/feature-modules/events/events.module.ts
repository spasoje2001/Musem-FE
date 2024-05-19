import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEventComponent } from './create-event/create-event.component';
import { DeletablePhotoComponent } from './deletable-photo/deletable-photo.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventPicturesComponent } from './event-pictures/event-pictures.component';
import { EventsComponent } from './events/events.component';
import { OragnizerEventCardComponent } from './oragnizer-event-card/oragnizer-event-card.component';
import { UpdateEventComponent } from './update-event/update-event.component';



@NgModule({
  declarations: [
    CreateEventComponent,
    DeletablePhotoComponent,
    EventCardComponent,
    EventInfoComponent,
    EventPicturesComponent,
    EventsComponent,
    OragnizerEventCardComponent,
    UpdateEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EventsModule { }
