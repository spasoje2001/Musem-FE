import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PersonalTourRequest } from '../../model/personalTourRequest.model';
import { MatDialog } from '@angular/material/dialog';
import { DeclineRequestPromptComponent } from '../decline-request-prompt/decline-request-prompt.component';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-tour-request-card-view',
  templateUrl: './tour-request-card-view.component.html',
  styleUrls: ['./tour-request-card-view.component.css']
})
export class TourRequestCardViewComponent implements OnInit{
  acceptButtonState: string = 'idle';   
  declineButtonState: string = 'idle'; 
  @Input() request!: PersonalTourRequest;
  private dialogRef: any;
  user: User | undefined;

  constructor(private dialog: MatDialog,
              private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    
  }

  acceptButtonClicked(id: number) {
    this.acceptButtonState = 'clicked'; 
    setTimeout(() => { this.acceptButtonState = 'idle'; }, 200); 
  }

  declineButtonClicked(request: PersonalTourRequest) {
    this.declineButtonState = 'clicked'; 
    setTimeout(() => { this.declineButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(DeclineRequestPromptComponent, {
      data: request
    });
  }

  faCheck = faCheck;
  faTimes = faTimes;
}
