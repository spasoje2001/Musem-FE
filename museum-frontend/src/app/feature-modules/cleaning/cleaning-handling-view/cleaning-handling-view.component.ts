import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Cleaning } from '../model/cleaning.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CleaningService } from '../cleaning.service';


@Component({
  selector: 'app-cleaning-handling-view',
  templateUrl: './cleaning-handling-view.component.html',
  styleUrls: ['./cleaning-handling-view.component.css'],
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
export class CleaningHandlingViewComponent {

  user: User | undefined;
  backgroundSize: string = '100% 100%';
  cleanings: Cleaning[] = [];
  
  constructor(private cleaningService: CleaningService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      
        this.cleaningService.getNewCleanings().subscribe({
          next: (result: Cleaning[] | Cleaning) => {
            if(Array.isArray(result)){
              this.cleanings = result;
            }
          }
        });
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
