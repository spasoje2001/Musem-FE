import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtifactComponent } from './edit-artifact.component';

describe('EditArtifactComponent', () => {
  let component: EditArtifactComponent;
  let fixture: ComponentFixture<EditArtifactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditArtifactComponent]
    });
    fixture = TestBed.createComponent(EditArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
