import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTourRequestFormComponent } from './edit-tour-request-form.component';

describe('EditTourRequestFormComponent', () => {
  let component: EditTourRequestFormComponent;
  let fixture: ComponentFixture<EditTourRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTourRequestFormComponent]
    });
    fixture = TestBed.createComponent(EditTourRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
