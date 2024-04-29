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
  
  constructor(private dialog: MatDialog, private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  navigateToDetails(id: number) {
    this.router.navigate(['/exhibitions', id]);
  }

}
