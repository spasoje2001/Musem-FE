import { Component } from '@angular/core';
import { ArtifactFormComponent } from '../artifact-form/artifact-form.component';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ItemsService } from '../items.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css'],
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
export class ArtifactsComponent {
  addItemButtonState: string = 'idle'; 
  private dialogRef: any;
  items: Item[] = [];
  slicedItems: Item[][] = [];
  constructor(private dialog: MatDialog, private itemService: ItemsService){

  }


  ngOnInit(): void {
      this.itemService.getItems().subscribe({
        next: (result: Item[] | Item) => {
          console.log(result);
          if(Array.isArray(result)){
            this.items = result;
            this.sliceItems();
          }
        }
      });
  };
  
  sliceItems() {
    const itemsPerRow = 4;
    this.slicedItems = [];
    for (let i = 0; i < this.items.length; i += itemsPerRow) {
        this.slicedItems.push(this.items.slice(i, i + itemsPerRow));
    }
  }

  addItemButtonClicked(){
    this.addItemButtonState = 'clicked'; 
    setTimeout(() => { this.addItemButtonState = 'idle'; }, 200);
    
    this.dialogRef = this.dialog.open(ArtifactFormComponent, {
    });
    this.dialogRef.afterClosed().subscribe(() => {
      // If you receive any data back from the dialog, you can check it here with 'result'
      // For now, we'll just refresh the list regardless
      this.itemService.getItems().subscribe({
        next: (result: Item[] | Item) => {
          if(Array.isArray(result)){
            this.items = result;
            this.sliceItems();
          }
        }
      });
    });
  }
}
