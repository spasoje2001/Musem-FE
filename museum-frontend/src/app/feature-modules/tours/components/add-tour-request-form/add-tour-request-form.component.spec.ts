import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTourRequestFormComponent } from './add-tour-request-form.component';

describe('AddTourRequestFormComponent', () => {
  let component: AddTourRequestFormComponent;
  let fixture: ComponentFixture<AddTourRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTourRequestFormComponent]
    });
    fixture = TestBed.createComponent(AddTourRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
