import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0 })),
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
  ]
})
export class HomeComponent {
  
  exhibitionsButtonState: string = 'idle'; 
  toursButtonState: string = 'idle'; 
  eventsButtonState: string = 'idle'; 

  constructor() {
  }
  
  cardGroupClicked(){
    console.log('click');
  }

  exhibitionsButtonClicked(){
    this.exhibitionsButtonState = 'clicked'; 
    setTimeout(() => { this.exhibitionsButtonState = 'idle'; }, 200);
  }

  toursButtonClicked(){
    this.toursButtonState = 'clicked'; 
    setTimeout(() => { this.toursButtonState = 'idle'; }, 200);
  }

  eventsButtonClicked(){
    this.eventsButtonState = 'clicked'; 
    setTimeout(() => { this.eventsButtonState = 'idle'; }, 200);
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
}
