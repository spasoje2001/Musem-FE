import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewEvent } from '../model/new-event.model';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css', '../shared-styles.css']
})
export class CreateEventComponent implements OnInit {

  rooms: Room[] = []
  selectedRoom?: Room;

  eventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDateTime: new FormControl(new Date().toISOString().slice(0, 16), [Validators.required]),
    durationMinutes: new FormControl(1, Validators.required),
    ticketsNumber: new FormControl(1, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    roomId: new FormControl(null, [Validators.required]),
    description: new FormControl(''),
  })

  constructor(
    private eventService: EventService,
    private roomService: RoomService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadAvailabeRooms();
  }

  loadAvailabeRooms(): void {
    this.roomService.getAvailableRoomsByTimespan(this.eventForm.value.startDateTime!, this.eventForm.value.durationMinutes!).subscribe(rooms => {
      this.rooms = rooms;

      if (rooms.length > 0) {
        this.selectedRoom = this.rooms.at(0);
      }
    })
  }

  create(): void {
    var newEvent: NewEvent = {
      name: this.eventForm.value.name || '',
      description: this.eventForm.value.description || '',
      startDateTime: this.eventForm.value.startDateTime || '',
      durationMinutes: this.eventForm.value.durationMinutes || 0,
      ticketsNumber: this.eventForm.value.ticketsNumber || 0,
      price: this.eventForm.value.ticketsNumber || 0,
      roomId: this.selectedRoom?.id || 0,
    }

    console.log(newEvent);
    console.log(this.selectedRoom);

    this.eventService.saveEvent(newEvent).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      }
    })
  }

  discard(): void {
    this.router.navigate(['/profile'])
  }

  onChange(): void {
    console.log('promjena');
  }

}
