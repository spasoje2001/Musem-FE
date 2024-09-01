import { Component, EventEmitter, Output } from '@angular/core';
import { ExhibitionSearchRequestDTO } from '../model/exhibition.model';

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent {
  @Output() searchCriteriaChanged = new EventEmitter<ExhibitionSearchRequestDTO>();
  @Output() clearFilters = new EventEmitter<void>();

  searchCriteria: ExhibitionSearchRequestDTO = {};
  minRating: number | undefined;

  onSearchChange() {
    if (this.minRating !== undefined) {
      this.searchCriteria.minRating = this.minRating;
    } else {
      delete this.searchCriteria.minRating;
    }
    this.searchCriteriaChanged.emit(this.searchCriteria);
  }

  onClearFilters() {
    this.searchCriteria = {};
    this.minRating = undefined;
    this.clearFilters.emit();
    this.searchCriteriaChanged.emit(this.searchCriteria); // Emit empty criteria to clear search
  }
}
