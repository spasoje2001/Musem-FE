import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPricelistViewComponent } from './tour-pricelist-view.component';

describe('TourPricelistViewComponent', () => {
  let component: TourPricelistViewComponent;
  let fixture: ComponentFixture<TourPricelistViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourPricelistViewComponent]
    });
    fixture = TestBed.createComponent(TourPricelistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
