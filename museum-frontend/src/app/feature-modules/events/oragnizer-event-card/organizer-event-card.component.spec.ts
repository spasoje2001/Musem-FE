import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerEventCardComponent } from './organizer-event-card.component';

describe('OrganizerEventCardComponent', () => {
  let component: OrganizerEventCardComponent;
  let fixture: ComponentFixture<OrganizerEventCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerEventCardComponent]
    });
    fixture = TestBed.createComponent(OrganizerEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
