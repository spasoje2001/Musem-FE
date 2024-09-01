import { Component, EventEmitter, Output } from '@angular/core';
import { ExhibitionSearchRequestDTO, ItemCategory } from '../model/exhibition.model';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {
  @Output() searchCriteriaChanged = new EventEmitter<ExhibitionSearchRequestDTO>();
  @Output() clearFilters = new EventEmitter<void>();

  searchCriteria: ExhibitionSearchRequestDTO = {};

  itemCategories = Object.values(ItemCategory);

  onSearchChange() {
    this.searchCriteriaChanged.emit(this.searchCriteria);
  }

  onClearFilters() {
    this.searchCriteria = {};
    this.clearFilters.emit();
    this.searchCriteriaChanged.emit(this.searchCriteria); // Emit empty criteria to clear search
  }
}
