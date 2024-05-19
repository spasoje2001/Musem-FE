import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactForDisplayComponent } from './artifact-for-display.component';

describe('ArtifactForDisplayComponent', () => {
  let component: ArtifactForDisplayComponent;
  let fixture: ComponentFixture<ArtifactForDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtifactForDisplayComponent]
    });
    fixture = TestBed.createComponent(ArtifactForDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
