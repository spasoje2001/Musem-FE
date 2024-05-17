import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutArtifactIntoRoomPromptComponent } from './put-artifact-into-room-prompt.component';

describe('PutArtifactIntoRoomPromptComponent', () => {
  let component: PutArtifactIntoRoomPromptComponent;
  let fixture: ComponentFixture<PutArtifactIntoRoomPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PutArtifactIntoRoomPromptComponent]
    });
    fixture = TestBed.createComponent(PutArtifactIntoRoomPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
