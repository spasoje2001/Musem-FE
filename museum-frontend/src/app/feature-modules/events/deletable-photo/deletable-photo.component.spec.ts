import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletablePhotoComponent } from './deletable-photo.component';

describe('DeletablePhotoComponent', () => {
  let component: DeletablePhotoComponent;
  let fixture: ComponentFixture<DeletablePhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletablePhotoComponent]
    });
    fixture = TestBed.createComponent(DeletablePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
