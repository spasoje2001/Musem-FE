import { Component, EventEmitter, Output } from '@angular/core';
import { ExhibitionSearchRequestDTO, ExhibitionStatus, ExhibitionTheme } from '../model/exhibition.model';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.css']
})
export class ExhibitionSearchComponent {
  @Output() searchCriteriaChanged = new EventEmitter<ExhibitionSearchRequestDTO>();
  @Output() clearFilters = new EventEmitter<void>();

  searchCriteria: ExhibitionSearchRequestDTO = {};

  themes = Object.values(ExhibitionTheme);

  onSearchChange() {
    this.searchCriteriaChanged.emit(this.searchCriteria);
  }

  onClearFilters() {
    this.searchCriteria = {};
    this.clearFilters.emit();
    this.searchCriteriaChanged.emit(this.searchCriteria); // Emit empty criteria to clear search
  }
}
