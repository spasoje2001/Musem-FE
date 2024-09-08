import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateExhibitionModalComponent } from './rate-exhibition-modal.component';

describe('RateExhibitionModalComponent', () => {
  let component: RateExhibitionModalComponent;
  let fixture: ComponentFixture<RateExhibitionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateExhibitionModalComponent]
    });
    fixture = TestBed.createComponent(RateExhibitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
