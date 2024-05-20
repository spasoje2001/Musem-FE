import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AcceptCleaningPromptComponent } from '../../cleaning/accept-cleaning-prompt/accept-cleaning-prompt.component';
import { CleaningService } from '../../cleaning/cleaning.service';
import { Item } from '../model/item.model';
import { ItemsService } from '../items.service';
import { RoomChosingComponent } from '../room-chosing/room-chosing.component';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-put-artifact-into-room-prompt',
  templateUrl: './put-artifact-into-room-prompt.component.html',
  styleUrls: ['./put-artifact-into-room-prompt.component.css'],
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
],
})
export class PutArtifactIntoRoomPromptComponent {



  cancelButtonState: string = 'idle';   
  acceptButtonState: string = 'idle'; 
  selectRoombuttonState: string = 'idle';
  focused: string = '';
  user: User | undefined;
  selectedRoom: Room[] = [];
  private ownDialogRef: any;
  itemId: number;
  roomId: number = 0;
  constructor(private itemService: ItemsService,
              private snackBar: MatSnackBar, 
              private authService: AuthService,
              private dialogRef: MatDialogRef<PutArtifactIntoRoomPromptComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.itemId = data;
    this.authService.user$.subscribe(user => {
      this.user = user;
  });
}

selectRoomButtonClicked() {
  this.selectRoombuttonState = 'clicked';
  setTimeout(() => { this.selectRoombuttonState = 'idle'; }, 200);
  this.ownDialogRef = this.dialog.open(RoomChosingComponent, {
    data: this.selectedRoom
  });
  this.ownDialogRef.afterClosed().subscribe((result: any) => {
    console.log('You have choosen the room: ' + this.selectedRoom);
  });
}

putToRoomButtonClicked(){
      if(this.selectedRoom.length != 0){
        this.roomId = this.selectedRoom[0].id;
        if(this.user != null){
          this.itemService.putIntoRoom(this.itemId, this.roomId).subscribe({
            next: () => {
              this.showNotification('Successfully put into room!');
              this.dialogRef.close();
            }
        });
      }
      }
      else{
        this.showNotification('Please select a room')
      }
  }

  cancelButtonClicked(){
    this.cancelButtonState = 'clicked'; 
    setTimeout(() => { this.cancelButtonState = 'idle'; }, 200); 
    this.dialogRef.close();
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
