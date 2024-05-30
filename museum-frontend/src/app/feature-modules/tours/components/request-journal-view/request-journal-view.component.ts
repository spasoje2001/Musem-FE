import { Component, HostListener, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatDialog } from "@angular/material/dialog";
import { ToursService } from "../../tours.service";
import { AuthService } from "../../../../infrastructure/auth/auth.service";
import { RequestsJournal } from "../../model/requestsJournal.model";

@Component({
  selector: 'app-request-journal-view',
  templateUrl: './request-journal-view.component.html',
  styleUrls: ['./request-journal-view.component.css'],
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
export class RequestJournalViewComponent implements OnInit {
  entries: RequestsJournal[] = [];
  backgroundSize: string = '100% 100%';

  constructor(private dialog: MatDialog,
              private toursService: ToursService,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.getEntries();
  }

  getEntries() {
    this.toursService.getJournalEntries().subscribe({
      next: (result: RequestsJournal[] | RequestsJournal) => {
        if(Array.isArray(result)){
          this.entries = result;
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;

    const zoom = 100 + scrollPercent * 0.3;

    this.backgroundSize = `${zoom}% ${zoom}%`;
  }

  handleDialogClosed(result: any) {
    this.getEntries();
  }

}
