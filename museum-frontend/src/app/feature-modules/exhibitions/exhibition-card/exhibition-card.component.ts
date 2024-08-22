import { Component, Input, SimpleChanges } from '@angular/core';
import { Exhibition } from '../model/exhibition.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exhibition-card',
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.css']
})
export class ExhibitionCardComponent {

  @Input() exhibition!: Exhibition;

  fullStars: number = 0;
  hasHalfStar: boolean = false;
  
  constructor(private dialog: MatDialog, private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.exhibition) {
      this.calculateStars();
    }
  }

  calculateStars() {
    // Računanje broja punih zvezdica i poluzvezdice na osnovu prosečne ocene
    this.fullStars = Math.floor(this.exhibition.averageRating);
    this.hasHalfStar = (this.exhibition.averageRating - this.fullStars) >= 0.5;
  }


  navigateToDetails(id: number) {
    this.router.navigate(['/exhibitions', id]);
  }

}
