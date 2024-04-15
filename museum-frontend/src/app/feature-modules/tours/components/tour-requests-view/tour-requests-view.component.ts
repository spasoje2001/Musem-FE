import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PersonalTourRequest } from '../../model/personalTourRequest.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ToursService } from '../../tours.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tour-requests-view',
  templateUrl: './tour-requests-view.component.html',
  styleUrls: ['./tour-requests-view.component.css'],
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
export class TourRequestsViewComponent implements OnInit{
  user: User | undefined;
  backgroundSize: string = '100% 100%';
  requests: PersonalTourRequest[] = [];
  
  constructor(private toursService: ToursService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
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

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;

    const zoom = 100 + scrollPercent * 0.3; 

    this.backgroundSize = `${zoom}% ${zoom}%`;
  }

}
