import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourCardViewComponent } from './tour-card-view.component';

describe('TourCardViewComponent', () => {
  let component: TourCardViewComponent;
  let fixture: ComponentFixture<TourCardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourCardViewComponent]
    });
    fixture = TestBed.createComponent(TourCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
