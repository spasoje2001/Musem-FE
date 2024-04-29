import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourRequestsViewComponent } from './tour-requests-view.component';

describe('TourRequestsViewComponent', () => {
  let component: TourRequestsViewComponent;
  let fixture: ComponentFixture<TourRequestsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourRequestsViewComponent]
    });
    fixture = TestBed.createComponent(TourRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
