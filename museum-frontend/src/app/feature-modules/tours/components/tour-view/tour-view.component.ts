import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddTourFormComponent } from '../add-tour-form/add-tour-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Tour } from '../../model/tour.model';
import { ToursService } from '../../tours.service';

@Component({
  selector: 'xp-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css'],
  animations: [
    trigger("fadeIn", [
        transition(":enter", [
            style({ opacity: 0, transform: "translateX(-40px)" }),
            animate(
                "0.5s ease",
                style({ opacity: 1, transform: "translateX(0)" }),
            ),
        ]),
    ]),
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
],
})
export class TourViewComponent implements OnInit{
  tours: Tour[] = [];
  tour: Tour[] = [];
  toursButtonState: string = "";
  private dialogRef: any;

  constructor(private dialog: MatDialog, private toursService: ToursService) {

  }

  ngOnInit(): void {
    this.toursService.getTours().subscribe({
      next: (result: Tour[] | Tour) => {
        if(Array.isArray(result)){
          this.tours = result;
        }
      }
    })
  }

  addToursButtonClicked() {
    this.toursButtonState = 'clicked'; 
    setTimeout(() => { this.toursButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(AddTourFormComponent, {
    });
  }

  backgroundSize: string = '100% 100%';

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;

    const zoom = 100 + scrollPercent * 0.3; 

    this.backgroundSize = `${zoom}% ${zoom}%`;
  }

  faPlus = faPlus;
}
