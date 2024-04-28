import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCleaningViewComponent } from './items-cleaning-view.component';

describe('ItemsCleaningViewComponent', () => {
  let component: ItemsCleaningViewComponent;
  let fixture: ComponentFixture<ItemsCleaningViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsCleaningViewComponent]
    });
    fixture = TestBed.createComponent(ItemsCleaningViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
