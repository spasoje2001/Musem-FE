import { Component } from '@angular/core';
import { Exhibition } from '../model/exhibition.model';
import { ActivatedRoute } from '@angular/router';
import { ExhibitionsService } from '../exhibitions.service';

@Component({
  selector: 'app-exhibition-details',
  templateUrl: './exhibition-details.component.html',
  styleUrls: ['./exhibition-details.component.css']
})
export class ExhibitionDetailsComponent {

  exhibition!: Exhibition;
  visibleItems: any[] = [];
  itemsToShow = 3;
  selectedItem: any = null;

  constructor(
    private route: ActivatedRoute,
    private exhibitionService: ExhibitionsService
  ) {}

  

ngOnInit() {
  const id = this.route.snapshot.params['id'];
  this.exhibitionService.getExhibitionById(id).subscribe({
    next: (exhibition: Exhibition) => {
      this.exhibition = exhibition;
      this.visibleItems = this.exhibition.itemReservations.slice(0, this.itemsToShow);
      console.log(this.visibleItems.length)
    },
    error: (err) => {
      console.error('Error fetching exhibition:', err);
    }
  });
}

showMore() {
  const nextItems = this.exhibition.itemReservations.slice(this.visibleItems.length, this.visibleItems.length + this.itemsToShow);
  this.visibleItems = [...this.visibleItems, ...nextItems];
}

showItemDetails(item: any) {
  this.selectedItem = item;
}

closeModal() {
  this.selectedItem = null;
}
}
