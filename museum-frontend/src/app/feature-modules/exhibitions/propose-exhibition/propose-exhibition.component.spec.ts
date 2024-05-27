import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeExhibitionComponent } from './propose-exhibition.component';

describe('ProposeExhibitionComponent', () => {
  let component: ProposeExhibitionComponent;
  let fixture: ComponentFixture<ProposeExhibitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposeExhibitionComponent]
    });
    fixture = TestBed.createComponent(ProposeExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
