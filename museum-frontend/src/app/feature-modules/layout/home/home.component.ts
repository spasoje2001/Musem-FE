import { trigger, transition, style, animate } from '@angular/animations';
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
  ]
})
export class HomeComponent {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }
  
  cardGroupClicked(){
    console.log('click');
  }

  backgroundSize: string = '100% 100%';

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;

    const zoom = 100 + scrollPercent * 0.3; 

    this.backgroundSize = `${zoom}% ${zoom}%`;
  }
}
