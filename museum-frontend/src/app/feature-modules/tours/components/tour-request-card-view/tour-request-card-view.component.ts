import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faTimes, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PersonalTourRequest } from '../../model/personalTourRequest.model';
import { MatDialog } from '@angular/material/dialog';
import { DeclineRequestPromptComponent } from '../decline-request-prompt/decline-request-prompt.component';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AcceptRequestFormComponent } from '../accept-request-form/accept-request-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToursService } from '../../tours.service';
import { Guest } from 'src/app/feature-modules/stakeholder/model/guest.model';
import { Exhibition } from "../../../exhibitions/model/exhibition.model";
import { DenialExplanationComponent } from "../denial-explanation/denial-explanation.component";
import { EditTourRequestFormComponent } from "../edit-tour-request-form/edit-tour-request-form.component";

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
  seeExplanationButtonState: string = 'idle';
  updateRequestButtonState: string = 'idle';
  cancelRequestButtonState: string = 'idle';
  @Input() request!: PersonalTourRequest;
  private dialogRef: any;
  user: User | undefined;
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();
  tourOccurrenceTime: string = "";
  tourOccurrenceDate: string = "";
  exhibitionsString: string = "";

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

    this.request.exhibitions!.forEach((exhibition: Exhibition) => {
      this.exhibitionsString += exhibition.name + ", ";
    });

    this.exhibitionsString = this.exhibitionsString.slice(0, -2);
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

  seeExplanationButtonClicked(request: PersonalTourRequest) {
    this.seeExplanationButtonState = 'clicked';
    setTimeout(() => { this.seeExplanationButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(DenialExplanationComponent, {
      data: request
    });
  }

  updateRequestButtonClicked(request: PersonalTourRequest){
    this.updateRequestButtonState = 'clicked';
    setTimeout(() => { this.updateRequestButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(EditTourRequestFormComponent, {
      data: request
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  cancelRequestButtonClicked(request: PersonalTourRequest){
    this.cancelRequestButtonState = 'clicked';
    setTimeout(() => { this.cancelRequestButtonState = 'idle'; }, 200);

    this.toursService.cancelTourRequest(request.id!).subscribe({
      next: (response: any) => {
        this.dialogRefClosed.emit(response);
      }
    })
  }

  faCheck = faCheck;
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;
}
