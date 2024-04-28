import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeFormComponent } from './edit-employee-form.component';

describe('EditEmployeeFormComponent', () => {
  let component: EditEmployeeFormComponent;
  let fixture: ComponentFixture<EditEmployeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeeFormComponent]
    });
    fixture = TestBed.createComponent(EditEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
