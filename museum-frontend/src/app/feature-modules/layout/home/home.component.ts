import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  activeIndex = 0;
  cardGroups = [
    { index: 0, status: 'active' },
    { index: 1, status: 'unknown' },
    { index: 2, status: 'unknown' }
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }
  
  cardGroupClicked(){
    console.log('click');
  }

  onRightButtonClicked() {
    console.log('DESNI KLIK')
    console.log('Aktivni indeks pre promene ' + this.activeIndex)

    const nextIndex = this.activeIndex + 1 <= this.cardGroups.length - 1 ? this.activeIndex + 1 : 0;

    this.cardGroups[this.activeIndex].status = 'after';
    
      this.cardGroups[nextIndex].status = 'becoming-active-from-before';
    
      // Introduce another slight delay before setting the next card group to 'active'
      setTimeout(() => {
        this.cardGroups[nextIndex].status = 'active';
        this.activeIndex = nextIndex;
      }, 250); // Adjust delay time as needed

    console.log('Aktivni indeks posle promene ' + this.activeIndex)
  }

  onLeftButtonClicked() {
    console.log('LEVI KLIK');
  }

  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
}
