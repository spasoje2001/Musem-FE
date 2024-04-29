import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { RoomService } from '../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../model/event.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from '../model/room.model';
import { NewEvent } from '../model/new-event.model';
import { UpdatedEvent } from '../model/updated-event.model';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css', '../shared-styles.css']
})
export class UpdateEventComponent implements OnInit {

  event?: Event;
  rooms: Room[] = []
  selectedRoom?: Room;

  eventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDateTime: new FormControl('', [Validators.required]),
    durationMinutes: new FormControl(1, Validators.required),
    ticketsNumber: new FormControl(1, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    roomId: new FormControl(0, [Validators.required]),
    description: new FormControl(''),
  })

  constructor(
    private eventService: EventService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.loadEvent();
  }

  loadAvailabeRooms(): void {
    this.roomService.getAvailableRoomsForUpdating(this.event?.id || 0, this.eventForm.value.startDateTime!, this.eventForm.value.durationMinutes!).subscribe(rooms => {
      this.rooms = rooms;

      if (rooms.length > 0) {
        this.selectedRoom = this.rooms.at(0);
      }
    })
  }

  loadEvent(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.eventService.getEventById(id!).subscribe(event => {
        this.event = event;
  
        this.eventForm.controls['name'].setValue(this.event.name);
        this.eventForm.controls['startDateTime'].setValue(this.event.startDateTime);
        this.eventForm.controls['durationMinutes'].setValue(this.event.durationMinutes);
        this.eventForm.controls['ticketsNumber'].setValue(this.event.ticketsNumber);
        this.eventForm.controls['price'].setValue(this.event.price);
        this.eventForm.controls['roomId'].setValue(this.event.roomReservation.room.id);
        this.eventForm.controls['description'].setValue(this.event.description);
        
        this.loadAvailabeRooms();
      })
    })
  }

  update(): void {
    var updatedEvent: UpdatedEvent = {
      id: this.event?.id || 0,
      name: this.eventForm.value.name || '',
      description: this.eventForm.value.description || '',
      startDateTime: this.eventForm.value.startDateTime || '',
      durationMinutes: this.eventForm.value.durationMinutes || 0,
      ticketsNumber: this.eventForm.value.ticketsNumber || 0,
      price: this.eventForm.value.ticketsNumber || 0,
      roomId: this.selectedRoom?.id || 0,
    }

    this.eventService.updateEvent(updatedEvent).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      }
    })
  }

  discard(): void {
    this.router.navigate(['/profile'])
  }

  onChange(): void {
    console.log('');
  }

}
