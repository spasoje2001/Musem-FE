import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curator } from '../../stakeholder/model/curator.model';
import { ToursService } from '../../tours/tours.service';
import { Room } from '../model/room.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-room-chosing',
  templateUrl: './room-chosing.component.html',
  styleUrls: ['./room-chosing.component.css'],
  animations: [
    trigger('buttonState', [
      state('clicked', style({
        transform: 'scale(0.9)',
        opacity: 0.5
      })),
      transition('* => clicked', [
        animate('200ms')
      ]),
      transition('clicked => idle', [
        animate('200ms')
      ])
    ]),
  ]
})
export class RoomChosingComponent {


  selectedRoom: Room[] = [];
  rooms: Room[] = [];
  doneButtonState: string = 'idle';
  chooseButtonState: string = 'idle';

  constructor(private dialogRef: MatDialogRef<RoomChosingComponent>,
              private snackBar: MatSnackBar,
              private itemService: ItemsService,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.selectedRoom = data;
  }

  ngOnInit(): void {
    this.itemService.getAllRooms().subscribe({
      next: (result: Room[] | Room) => {
        if(Array.isArray(result)){
          this.rooms = result;
        }
      }
    });
  }

  onChooseClicked(room: Room){
    this.selectedRoom.push(room);
    this.showNotification('Room successfully chosen!');
  }

  onRemoveClicked(roomToRemove: Room){
    this.selectedRoom = this.selectedRoom.filter(curator => curator.id !== roomToRemove.id);
    this.showNotification('Room successfully removed!');
  }

  isSelected(room: Room): boolean {
    return this.selectedRoom.includes(room);
  }

  doneButtonClicked(){
    this.doneButtonState = 'clicked'; 
    setTimeout(() => { this.doneButtonState = 'idle'; }, 200); 
    this.dialogRef.close();
    this.showNotification('Your picks have been saved!');
  }

  overviewClicked(){
    this.dialogRef.close();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'bottom', 
    });
  }
}
