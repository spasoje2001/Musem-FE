import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemsService } from '../items.service';
import { Item } from '../model/item.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-artifact-for-display',
  templateUrl: './artifact-for-display.component.html',
  styleUrls: ['./artifact-for-display.component.css']
})
export class ArtifactForDisplayComponent {
  private dialogRef: any;
  items: Item[] = [];
  slicedItems: Item[][] = [];


  constructor(private dialog: MatDialog, private itemService: ItemsService, private authService: AuthService){
    
  }

  handleDialogClosed(result: any) {
    this.itemService.getItemsForDisplay().subscribe({
      next: (result: Item[] | Item) => {
        console.log(result);
        if(Array.isArray(result)){
          this.items = result;
          this.sliceItems();
        }
      }
    });
  }

  ngOnInit(): void {
    this.itemService.getItemsForDisplay().subscribe({
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

}
