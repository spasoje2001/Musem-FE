import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PersonalTourRequest } from '../../model/personalTourRequest.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ToursService } from '../../tours.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddTourRequestFormComponent } from '../add-tour-request-form/add-tour-request-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PdfHandledRequestsPromptComponent} from "../pdf-handled-requests-prompt/pdf-handled-requests-prompt.component";
import {PdfRequestsPromptComponent} from "../pdf-requests-prompt/pdf-requests-prompt.component";

@Component({
  selector: 'app-tour-requests-view',
  templateUrl: './tour-requests-view.component.html',
  styleUrls: ['./tour-requests-view.component.css'],
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
export class TourRequestsViewComponent implements OnInit{
  user: User | undefined;
  backgroundSize: string = '100% 100%';
  requests: PersonalTourRequest[] = [];
  tourRequestsButtonState: string = "";
  handledRequestsReportButtonState: string = "";
  requestsReportButtonState: string = "";

  private dialogRef: any;

  constructor(private toursService: ToursService,
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,) {

  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if(this.user.role === 'GUEST'){
        this.toursService.getGuestsTourRequests(this.user.id).subscribe({
          next: (result: PersonalTourRequest[] | PersonalTourRequest) => {
            if(Array.isArray(result)){
              this.requests = result;
            }
          }
        });
      }
      else{
        this.toursService.getTourRequestsOnHold().subscribe({
          next: (result: PersonalTourRequest[] | PersonalTourRequest) => {
            if(Array.isArray(result)){
              this.requests = result;
            }
          }
        });
      }
    });
  }

  handleDialogClosed(result: any) {
    this.getRequests();
  }

  addTourRequestButtonClicked() {
    this.tourRequestsButtonState = 'clicked';
    setTimeout(() => { this.tourRequestsButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(AddTourRequestFormComponent, {
    });

    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.getRequests();
      });
    }
  }

  openHandledRequestsReportDialogue(): void {
    this.handledRequestsReportButtonState = 'clicked';
    setTimeout(() => { this.handledRequestsReportButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(PdfHandledRequestsPromptComponent, {
    });

    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.getRequests();
      });
    }
  }

  openRequestsReportDialogue(): void {
    this.requestsReportButtonState = 'clicked';
    setTimeout(() => { this.requestsReportButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(PdfRequestsPromptComponent, {
    });

    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.getRequests();
      });
    }
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
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

  faPlus = faPlus;
}
