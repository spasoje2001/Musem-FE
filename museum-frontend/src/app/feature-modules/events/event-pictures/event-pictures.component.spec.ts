import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPicturesComponent } from './event-pictures.component';

describe('EventPicturesComponent', () => {
  let component: EventPicturesComponent;
  let fixture: ComponentFixture<EventPicturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventPicturesComponent]
    });
    fixture = TestBed.createComponent(EventPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
