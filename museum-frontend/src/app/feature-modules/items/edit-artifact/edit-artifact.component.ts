import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject, Input } from '@angular/core';
import { ArtifactFormComponent } from '../artifact-form/artifact-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemsService } from '../items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCategory, Item } from '../model/item.model';

@Component({
  selector: 'app-edit-artifact',
  templateUrl: './edit-artifact.component.html',
  styleUrls: ['./edit-artifact.component.css'],
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
export class EditArtifactComponent {

  buttonState: string = 'idle'; 
  focused: string = '';
  itemImage: string | null = null;
  itemImageFile: File | null = null;
  @Input() item: Item;

  constructor(private itemsService: ItemsService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<EditArtifactComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) {
      this.item = data;
      this.ngOnChanges();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges() : void {
      this.editItemForm.reset();
          const itemToPatch = {
            name: this.item.name || "",
            description: this.item.description || "",
            authorsName: this.item.authorsName || "",
            yearOfCreation: this.item.yearOfCreation || "",
            period: this.item.period || "",
            category:  "",
            picture: this.item.picture || "",
          };
      this.editItemForm.patchValue(itemToPatch);
  }

  editItemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    authorsName: new FormControl('', [Validators.required]),
    yearOfCreation: new FormControl('', [Validators.required]),
    period: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
  });

  editItemButtonClicked() {

    const selectedCategoryString: string = this.editItemForm.value.category ?? '';
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
      id: this.item.id,
      name: this.editItemForm.value.name || "",
      description: this.editItemForm.value.description || "",
      picture: this.editItemForm.value.picture || "",
      authorsName: this.editItemForm.value.authorsName || "",
      yearOfCreation: this.editItemForm.value.yearOfCreation || "",
      period: this.editItemForm.value.period || "",
      category: selectedCategory,
    };

    console.log(item);

        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 

          this.itemsService.updateItem(item).subscribe({
            next: () => {
              this.showNotification('Item successfully edited!');
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
