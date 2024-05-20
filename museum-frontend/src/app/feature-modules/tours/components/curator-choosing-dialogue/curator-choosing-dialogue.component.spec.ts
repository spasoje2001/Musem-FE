import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorChoosingDialogueComponent } from './curator-choosing-dialogue.component';

describe('CuratorChoosingDialogueComponent', () => {
  let component: CuratorChoosingDialogueComponent;
  let fixture: ComponentFixture<CuratorChoosingDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuratorChoosingDialogueComponent]
    });
    fixture = TestBed.createComponent(CuratorChoosingDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
