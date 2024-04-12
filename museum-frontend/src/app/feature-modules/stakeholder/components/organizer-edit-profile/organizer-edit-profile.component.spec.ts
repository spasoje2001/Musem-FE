import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerEditProfileComponent } from './organizer-edit-profile.component';

describe('OrganizerEditProfileComponent', () => {
  let component: OrganizerEditProfileComponent;
  let fixture: ComponentFixture<OrganizerEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerEditProfileComponent]
    });
    fixture = TestBed.createComponent(OrganizerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
