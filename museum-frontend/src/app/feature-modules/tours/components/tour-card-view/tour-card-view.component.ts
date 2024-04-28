import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faCoins, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tour } from '../../model/tour.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { RemoveTourPromptComponent } from '../remove-tour-prompt/remove-tour-prompt.component';
import { EditTourFormComponent } from '../edit-tour-form/edit-tour-form.component';

@Component({
  selector: 'xp-tour-card-view',
  templateUrl: './tour-card-view.component.html',
  styleUrls: ['./tour-card-view.component.css'],
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
export class TourCardViewComponent implements OnChanges{
  editButtonState: string = 'idle';   
  removeButtonState: string = 'idle'; 
  @Input() tour!: Tour;
  private dialogRef: any;
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {

  }

  ngOnChanges(changes: SimpleChanges,): void {

  }

  editButtonClicked() {
    this.editButtonState = 'clicked'; 
    setTimeout(() => { this.editButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(EditTourFormComponent, {
      data: this.tour
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  removeButtonClicked(id: number) {
    this.removeButtonState = 'clicked'; 
    setTimeout(() => { this.removeButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(RemoveTourPromptComponent, {
      data: id
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
      alert('Tour is successfully removed');
    });
  }

  faCoins = faCoins;
  faPen = faPen;
  faRemove = faTrash;
}
