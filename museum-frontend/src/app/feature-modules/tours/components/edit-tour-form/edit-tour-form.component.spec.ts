import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTourFormComponent } from './edit-tour-form.component';

describe('EditTourFormComponent', () => {
  let component: EditTourFormComponent;
  let fixture: ComponentFixture<EditTourFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTourFormComponent]
    });
    fixture = TestBed.createComponent(EditTourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
