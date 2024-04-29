import { Component, Input, SimpleChanges } from '@angular/core';
import { Item } from '../model/item.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-artifact-card',
  templateUrl: './artifact-card.component.html',
  styleUrls: ['./artifact-card.component.css']
})
export class ArtifactCardComponent {
  editButtonState: string = 'idle';   
  removeButtonState: string = 'idle'; 
  @Input() item!: Item;
  private dialogRef: any;

  constructor(private dialog: MatDialog) {

  }

  ngOnChanges(changes: SimpleChanges,): void {

  }

  editButtonClicked() {
    this.editButtonState = 'clicked'; 
    setTimeout(() => { this.editButtonState = 'idle'; }, 200); 
  }

}
