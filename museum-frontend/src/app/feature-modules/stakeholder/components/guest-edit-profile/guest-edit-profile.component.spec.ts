import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEditProfileComponent } from './guest-edit-profile.component';

describe('GuestEditProfileComponent', () => {
  let component: GuestEditProfileComponent;
  let fixture: ComponentFixture<GuestEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestEditProfileComponent]
    });
    fixture = TestBed.createComponent(GuestEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
