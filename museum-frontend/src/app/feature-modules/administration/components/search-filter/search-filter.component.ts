import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  searchControl = new FormControl('');

  @Output() searchChange = new EventEmitter<string>();


  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged() // Only emit if value is different from previous value
      )
      .subscribe((value) => {
        this.searchChange.emit(value || '');
      });
  }

  faSearch = faSearch;
}
