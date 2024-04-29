import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningHandlingViewComponent } from './cleaning-handling-view.component';

describe('CleaningHandlingViewComponent', () => {
  let component: CleaningHandlingViewComponent;
  let fixture: ComponentFixture<CleaningHandlingViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningHandlingViewComponent]
    });
    fixture = TestBed.createComponent(CleaningHandlingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
