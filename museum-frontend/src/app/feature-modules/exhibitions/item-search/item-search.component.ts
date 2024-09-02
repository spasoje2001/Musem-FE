import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExhibitionSearchRequestDTO, ItemCategory } from '../model/exhibition.model';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {
  @Input() searchCriteria: ExhibitionSearchRequestDTO = {};
  @Output() searchCriteriaChanged = new EventEmitter<ExhibitionSearchRequestDTO>();


  itemCategories = Object.values(ItemCategory);

  onSearchChange() {
    this.searchCriteriaChanged.emit(this.searchCriteria);
  }

  onClearFilters() {
    this.searchCriteria.itemName = '';
    this.searchCriteria.itemDescription = '';
    this.searchCriteria.itemAuthorsName = '';
    this.searchCriteria.itemPeriod = '';
    this.searchCriteria.itemCategory = undefined;

    this.searchCriteriaChanged.emit(this.searchCriteria);
}

}
