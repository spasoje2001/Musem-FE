import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactCardComponent } from './artifact-card.component';

describe('ArtifactCardComponent', () => {
  let component: ArtifactCardComponent;
  let fixture: ComponentFixture<ArtifactCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtifactCardComponent]
    });
    fixture = TestBed.createComponent(ArtifactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
