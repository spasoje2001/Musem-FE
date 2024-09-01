import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionSearchComponent } from './exhibition-search.component';

describe('ExhibitionSearchComponent', () => {
  let component: ExhibitionSearchComponent;
  let fixture: ComponentFixture<ExhibitionSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitionSearchComponent]
    });
    fixture = TestBed.createComponent(ExhibitionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
