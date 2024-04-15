import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurateurProfileComponent } from './restaurateur-profile.component';

describe('RestaurateurProfileComponent', () => {
  let component: RestaurateurProfileComponent;
  let fixture: ComponentFixture<RestaurateurProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurateurProfileComponent]
    });
    fixture = TestBed.createComponent(RestaurateurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
