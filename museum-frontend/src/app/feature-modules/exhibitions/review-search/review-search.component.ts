import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ExhibitionSearchRequestDTO } from '../model/exhibition.model';

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent {
  @Input() searchCriteria: ExhibitionSearchRequestDTO = {};
  @Output() searchCriteriaChanged = new EventEmitter<ExhibitionSearchRequestDTO>();

  minRating: number = 0; // Podrazumevano na 0

  ngOnInit(): void {
    // Initialize minRating from the searchCriteria if it exists
    if (this.searchCriteria.minRating !== undefined) {
        this.minRating = this.searchCriteria.minRating;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchCriteria'] && changes['searchCriteria'].currentValue) {
      // Sinhronizuj minRating sa searchCriteria
      this.minRating = this.searchCriteria.minRating !== undefined ? this.searchCriteria.minRating : 0;
    }
  }

 


  onSearchChange() {
    if (this.minRating === 0) {
        delete this.searchCriteria.minRating; // Ne uključujemo minRating ako je 0
    } else {
        this.searchCriteria.minRating = this.minRating;
    }
    this.searchCriteriaChanged.emit(this.searchCriteria);
  }





  onClearFilters() {
    this.minRating = 0; // Reset na 0
    delete this.searchCriteria.minRating; // Uklanjanje minRating iz searchCriteria
    this.searchCriteria.comment = '';
    this.searchCriteria.guest = '';
    this.searchCriteriaChanged.emit(this.searchCriteria);
}


}
