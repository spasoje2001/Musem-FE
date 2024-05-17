import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-pictures',
  templateUrl: './event-pictures.component.html',
  styleUrls: ['./event-pictures.component.css', '../shared-styles.css']
})
export class EventPicturesComponent {
  
  @Input() photos: string[] = [];

  onClick(imageUrl: string) {
    if (imageUrl) {
      this.photos.push(imageUrl);
    }
  }

  onDeleted(imageUrl: string) {
    const index = this.photos.indexOf(imageUrl);
    if (index !== -1) {
      this.photos.splice(index, 1);
    }
  }

}
