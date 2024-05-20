import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deletable-photo',
  templateUrl: './deletable-photo.component.html',
  styleUrls: ['./deletable-photo.component.css']
})
export class DeletablePhotoComponent {

  @Input() photo?: string;

  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  onDeleted() {
    this.deleted.emit(this.photo);
  }

}
