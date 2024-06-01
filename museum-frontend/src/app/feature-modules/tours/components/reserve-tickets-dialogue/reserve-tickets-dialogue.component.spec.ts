import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTicketsDialogueComponent } from './reserve-tickets-dialogue.component';

describe('ReserveTicketsDialogueComponent', () => {
  let component: ReserveTicketsDialogueComponent;
  let fixture: ComponentFixture<ReserveTicketsDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveTicketsDialogueComponent]
    });
    fixture = TestBed.createComponent(ReserveTicketsDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
