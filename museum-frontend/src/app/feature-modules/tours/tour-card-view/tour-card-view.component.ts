import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tour } from '../model/tour.model';
import { faCoins, faPen, faRemove } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'xp-tour-card-view',
  templateUrl: './tour-card-view.component.html',
  styleUrls: ['./tour-card-view.component.css']
})
export class TourCardViewComponent implements OnChanges{
  
  @Input() tour!: Tour;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor() {
  }

  edit() {

  }

  remove(id: number) {

  }

  faCoins = faCoins;
  faPen = faPen;
  faRemove = faRemove;
}
