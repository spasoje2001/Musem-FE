import { Component } from '@angular/core';
import { Exhibition } from '../model/exhibition.model';
import { MatDialog } from '@angular/material/dialog';
import { ExhibitionsService } from '../exhibitions.service';

@Component({
  selector: 'app-exhibitions-view',
  templateUrl: './exhibitions-view.component.html',
  styleUrls: ['./exhibitions-view.component.css']
})
export class ExhibitionsViewComponent {

  private dialogRef: any;
  exhibitions: Exhibition[] = [];
  slicedExhibitions: Exhibition[][] = [];
  activeFilter: string = 'current';
  filteredExhibitions: Exhibition[] = [];

  constructor(private dialog: MatDialog, private exhibitionService: ExhibitionsService){

  }

  ngOnInit(): void {
    this.loadExhibitions();
  }

  loadExhibitions(): void {
    this.exhibitionService.getExhibitions().subscribe({
      next: (result: Exhibition[] | Exhibition) => {
        console.log(result);
        if (Array.isArray(result)) {
          this.exhibitions = result;
          this.applyFilter();
        }
      }
    });
  }

  filterExhibitions(type: string): void {
    this.activeFilter = type;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.activeFilter === 'current') {
      this.filteredExhibitions = this.exhibitions.filter(
        exhibition => exhibition.status === 'OPENED'
      );
    } else if (this.activeFilter === 'upcoming') {
      this.filteredExhibitions = this.exhibitions.filter(
        exhibition => exhibition.status === 'READY_TO_OPEN'
      );
    } else if (this.activeFilter === 'past') {
      this.filteredExhibitions = this.exhibitions.filter(
        exhibition => exhibition.status === 'CLOSED'
      );
    }
  }

}
