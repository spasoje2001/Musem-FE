import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExhibitionSearchRequestDTO, ExhibitionStatus, ExhibitionTheme } from '../model/exhibition.model';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.css']
})
export class ExhibitionSearchComponent {
  @Input() searchCriteria: ExhibitionSearchRequestDTO = {};
  @Output() searchCriteriaChanged = new EventEmitter<ExhibitionSearchRequestDTO>();


  themes = Object.values(ExhibitionTheme);

  ngOnInit(): void {
    console.log("init")
    // This will ensure that the form fields are correctly initialized
    // when the dropdown is opened.
    if (this.searchCriteria) {
      console.log("usao sam")
      console.log(this.searchCriteria);
      this.searchCriteria = { ...this.searchCriteria };
    }
  }

  onSearchChange() {
    this.searchCriteriaChanged.emit(this.searchCriteria);
  }

  onClearFilters() {
    // Resetovanje samo polja koja pripadaju ovoj komponenti
    this.searchCriteria.name = '';
    this.searchCriteria.startDate = '';
    this.searchCriteria.endDate = '';
    this.searchCriteria.curator = '';
    this.searchCriteria.theme = undefined;
    this.searchCriteria.description = '';
    this.searchCriteria.organizer = '';

    // Emitovanje promene da bi se ažurirala pretraga
    this.searchCriteriaChanged.emit(this.searchCriteria);
}

}
