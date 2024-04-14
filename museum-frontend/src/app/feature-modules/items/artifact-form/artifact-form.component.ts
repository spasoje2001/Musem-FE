import { Component } from '@angular/core';
import { ItemsService } from '../items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item, ItemCategory, ItemStatus } from '../model/item.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    category: new FormControl(null, [Validators.required]),
    picture: new FormControl(null, [Validators.required]),
  });

  addItemButtonClicked() {
    const item: Item = {
      name: this.addItemForm.value.name || "",
      description: this.addItemForm.value.description || "",
      picture: this.addItemForm.value.picture || "",
      authorsName: this.addItemForm.value.authorsName || "",
      yearOfCreation: this.addItemForm.value.yearOfCreation || "",
      period: this.addItemForm.value.period || "",
      category: this.addItemForm.value.category || ItemCategory.Painting,
    };

    console.log(item);

    if (this.addItemForm.valid) {
        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 


        
          this.itemsService.addItem(item).subscribe({
            next: () => {
              this.dialogRef.close();
            },
          });
        
    }
    else{
      console.log('Add item form not valid!'); // Treba dodati neki vid validacije
    }
  }


  overviewClicked(){
    this.dialogRef.close();
  }
}
