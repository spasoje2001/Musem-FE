import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionChoosingDialogueComponent } from './exhibition-choosing-dialogue.component';

describe('ExhibitionChoosingDialogueComponent', () => {
  let component: ExhibitionChoosingDialogueComponent;
  let fixture: ComponentFixture<ExhibitionChoosingDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitionChoosingDialogueComponent]
    });
    fixture = TestBed.createComponent(ExhibitionChoosingDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
