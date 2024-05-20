import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChosingComponent } from './room-chosing.component';

describe('RoomChosingComponent', () => {
  let component: RoomChosingComponent;
  let fixture: ComponentFixture<RoomChosingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomChosingComponent]
    });
    fixture = TestBed.createComponent(RoomChosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
