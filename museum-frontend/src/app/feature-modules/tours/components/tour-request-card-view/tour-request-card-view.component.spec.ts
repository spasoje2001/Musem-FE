import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourRequestCardViewComponent } from './tour-request-card-view.component';

describe('TourRequestCardViewComponent', () => {
  let component: TourRequestCardViewComponent;
  let fixture: ComponentFixture<TourRequestCardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourRequestCardViewComponent]
    });
    fixture = TestBed.createComponent(TourRequestCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
