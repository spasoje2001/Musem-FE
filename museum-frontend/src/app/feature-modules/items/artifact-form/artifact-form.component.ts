import { Component } from '@angular/core';
import { ItemsService } from '../items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item, ItemCategory } from '../model/item.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-artifact-form',
  templateUrl: './artifact-form.component.html',
  styleUrls: ['./artifact-form.component.css'],
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
export class ArtifactFormComponent {
  buttonState: string = 'idle'; 
  focused: string = '';
  itemImage: string | null = null;
  itemImageFile: File | null = null;

  constructor(private itemsService: ItemsService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ArtifactFormComponent>) {
  }

  ngOnInit(): void {
    
  }

  addItemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    authorsName: new FormControl('', [Validators.required]),
    yearOfCreation: new FormControl('', [Validators.required]),
    period: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
  });

  addItemButtonClicked() {

    const selectedCategoryString: string = this.addItemForm.value.category ?? '';
    let selectedCategory: ItemCategory;

    switch (selectedCategoryString) {
        case 'Painting':
            selectedCategory = ItemCategory.Painting;
            break;
        case 'Drawing':
            selectedCategory = ItemCategory.Drawing;
            break;
        case 'Sculpture':
            selectedCategory = ItemCategory.Sculpture;
            break;
        case 'Print':
            selectedCategory = ItemCategory.Print;
            break;
        case 'Photograph':
            selectedCategory = ItemCategory.Photograph;
            break;
        case 'Artifact':
            selectedCategory = ItemCategory.Artifact;
            break;
        case 'Clothing':
            selectedCategory = ItemCategory.Clothing;
            break;
        case 'Specimen':
            selectedCategory = ItemCategory.Specimen;
            break;
        case 'Fossil':
            selectedCategory = ItemCategory.Fossil;
            break;
        case 'Animal':
            selectedCategory = ItemCategory.Animal;
            break;
        case 'Mineral':
            selectedCategory = ItemCategory.Mineral;
            break;
        case 'Pottery':
            selectedCategory = ItemCategory.Pottery;
            break;
        case 'Jewelry':
            selectedCategory = ItemCategory.Jewelry;
            break;
        default:
            console.error("Invalid category selected.");
            return; 
    }

    const item: Item = {
      name: this.addItemForm.value.name || "",
      description: this.addItemForm.value.description || "",
      picture: this.addItemForm.value.picture || "",
      authorsName: this.addItemForm.value.authorsName || "",
      yearOfCreation: this.addItemForm.value.yearOfCreation || "",
      period: this.addItemForm.value.period || "",
      category: selectedCategory,
    };

    console.log(item);

        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 

          this.itemsService.addItem(item).subscribe({
            next: () => {
              this.showNotification('Item successfully added!');
              this.dialogRef.close();
            },
          });
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
