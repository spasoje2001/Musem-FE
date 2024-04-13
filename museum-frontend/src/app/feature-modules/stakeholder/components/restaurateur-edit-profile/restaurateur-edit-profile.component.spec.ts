import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurateurEditProfileComponent } from './restaurateur-edit-profile.component';

describe('RestaurateurEditProfileComponent', () => {
  let component: RestaurateurEditProfileComponent;
  let fixture: ComponentFixture<RestaurateurEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurateurEditProfileComponent]
    });
    fixture = TestBed.createComponent(RestaurateurEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
