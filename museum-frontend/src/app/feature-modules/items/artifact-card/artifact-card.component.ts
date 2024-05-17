import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Item } from '../model/item.model';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditArtifactComponent } from '../edit-artifact/edit-artifact.component';
import { PutArtifactIntoRoomPromptComponent } from '../put-artifact-into-room-prompt/put-artifact-into-room-prompt.component';

@Component({
  selector: 'app-artifact-card',
  templateUrl: './artifact-card.component.html',
  styleUrls: ['./artifact-card.component.css']
})
export class ArtifactCardComponent {
  editButtonState: string = 'idle';   
  putIntoRoomButtonState: string = 'idle'; 
  user: User | undefined;
  @Input() item!: Item;

  private dialogRef: any;
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private authService: AuthService, private snackBar: MatSnackBar) {
    this.authService.user$.subscribe(user => {
      this.user = user;
  });
  }

  ngOnChanges(changes: SimpleChanges,): void {

  }



  editButtonClicked() {
    this.editButtonState = 'clicked'; 
    setTimeout(() => { this.editButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(EditArtifactComponent, {
      data: this.item
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  putIntoRoomButtonClicked(id: number) {
    this.putIntoRoomButtonState = 'clicked'; 
    setTimeout(() => { this.putIntoRoomButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(PutArtifactIntoRoomPromptComponent, {
      data: id
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

}
