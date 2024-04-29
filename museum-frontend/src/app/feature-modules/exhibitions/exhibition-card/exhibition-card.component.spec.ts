import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionCardComponent } from './exhibition-card.component';

describe('ExhibitionCardComponent', () => {
  let component: ExhibitionCardComponent;
  let fixture: ComponentFixture<ExhibitionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitionCardComponent]
    });
    fixture = TestBed.createComponent(ExhibitionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
