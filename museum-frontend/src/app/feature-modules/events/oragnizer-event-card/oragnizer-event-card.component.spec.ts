import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OragnizerEventCardComponent } from './oragnizer-event-card.component';

describe('OragnizerEventCardComponent', () => {
  let component: OragnizerEventCardComponent;
  let fixture: ComponentFixture<OragnizerEventCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OragnizerEventCardComponent]
    });
    fixture = TestBed.createComponent(OragnizerEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
