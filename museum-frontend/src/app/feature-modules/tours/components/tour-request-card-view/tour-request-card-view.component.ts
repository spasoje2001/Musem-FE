import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PersonalTourRequest } from '../../model/personalTourRequest.model';
import { MatDialog } from '@angular/material/dialog';
import { DeclineRequestPromptComponent } from '../decline-request-prompt/decline-request-prompt.component';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AcceptRequestFormComponent } from '../accept-request-form/accept-request-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToursService } from '../../tours.service';
import { Guest } from 'src/app/feature-modules/stakeholder/model/guest.model';

@Component({
  selector: 'xp-tour-request-card-view',
  templateUrl: './tour-request-card-view.component.html',
  styleUrls: ['./tour-request-card-view.component.css'],
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
  ],
})
export class TourRequestCardViewComponent implements OnInit{
  acceptButtonState: string = 'idle';   
  declineButtonState: string = 'idle'; 
  @Input() request!: PersonalTourRequest;
  private dialogRef: any;
  user: User | undefined;
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>(); // Define event emitter
  tourOccurrenceTime: string = "";
  tourOccurrenceDate: string = "";

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private toursService: ToursService) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    const tourOccurrenceDateTimeString = this.request.occurrenceDateTime.toString();
    [this.tourOccurrenceDate, this.tourOccurrenceTime] = tourOccurrenceDateTimeString.split('T');

    if(this.request.proposerId){
      this.toursService.getGuestById(this.request.proposerId).subscribe({
        next : (result: Guest) => {
          this.request.proposer = result;
        }
      });
    }
  }

  acceptButtonClicked(request: PersonalTourRequest) {
    this.acceptButtonState = 'clicked'; 
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(AcceptRequestFormComponent, {
      data: request
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  declineButtonClicked(request: PersonalTourRequest) {
    this.declineButtonState = 'clicked'; 
    setTimeout(() => { this.declineButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(DeclineRequestPromptComponent, {
      data: request
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  faCheck = faCheck;
  faTimes = faTimes;
}
