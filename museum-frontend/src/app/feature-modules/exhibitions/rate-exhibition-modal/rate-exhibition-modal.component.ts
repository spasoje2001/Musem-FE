import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-exhibition-modal',
  templateUrl: './rate-exhibition-modal.component.html',
  styleUrls: ['./rate-exhibition-modal.component.css']
})
export class RateExhibitionModalComponent {
  rating: number = 0;

  constructor(public dialogRef: MatDialogRef<RateExhibitionModalComponent>) {}

  getRatingMessage(rating: number): string {
    switch (rating) {
      case 1: return "I just hate it 😠";
      case 2: return "I don't like it 🙁";
      case 3: return "It's okay 😊";
      case 4: return "I like it! 😁";
      case 5: return "I love it! ❤️";
      default: return "";
    }
  }

  setRating(stars: number) {
    this.rating = stars;
  }

  submitRating() {
    this.dialogRef.close({ rating: this.rating });
  }
}
