import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTourFormComponent } from './add-tour-form.component';

describe('AddTourFormComponent', () => {
  let component: AddTourFormComponent;
  let fixture: ComponentFixture<AddTourFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTourFormComponent]
    });
    fixture = TestBed.createComponent(AddTourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
