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
  constructor(private dialog: MatDialog, private exhibitionService: ExhibitionsService){

  }

  ngOnInit(): void {
    this.exhibitionService.getExhibitions().subscribe({
      next: (result: Exhibition[] | Exhibition) => {
        console.log(result);
        if(Array.isArray(result)){
          this.exhibitions = result.filter(
            (exhibition) => exhibition.status === 'OPEN' || exhibition.status === 'READY_TO_OPEN'
          );;
          this.sliceItems();
        }
      }
    }); 
  };

  sliceItems() {
    const itemsPerRow = 4;
    this.slicedExhibitions = [];
    for (let i = 0; i < this.exhibitions.length; i += itemsPerRow) {
        this.slicedExhibitions.push(this.exhibitions.slice(i, i + itemsPerRow));
    }
  }
}
