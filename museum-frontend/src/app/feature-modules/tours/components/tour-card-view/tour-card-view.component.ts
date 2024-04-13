import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faCoins, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tour } from '../../model/tour.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'xp-tour-card-view',
  templateUrl: './tour-card-view.component.html',
  styleUrls: ['./tour-card-view.component.css'],
  animations: [
    trigger('buttonState', [
      state('clicked', style({
        transform: 'scale(0.9)',
        opacity: 0.5
      })),
      transition('* => clicked', [
        animate('200ms')
      ]),
      transition('clicked => idle', [
        animate('200ms')
      ])
    ]),
  ]
})
export class TourCardViewComponent implements OnChanges{
  editButtonState: string = 'idle';   
  removeButtonState: string = 'idle'; 
  @Input() tour!: Tour;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor() {
  }

  editButtonClicked() {
    this.editButtonState = 'clicked'; 
    setTimeout(() => { this.editButtonState = 'idle'; }, 200); 
  }

  removeButtonClicked(id: number) {
    this.removeButtonState = 'clicked'; 
    setTimeout(() => { this.removeButtonState = 'idle'; }, 200); 
  }

  faCoins = faCoins;
  faPen = faPen;
  faRemove = faTrash;
}
