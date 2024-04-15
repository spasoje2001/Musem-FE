import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockConfirmationDialogComponent } from './lock-confirmation-dialog.component';

describe('LockConfirmationDialogComponent', () => {
  let component: LockConfirmationDialogComponent;
  let fixture: ComponentFixture<LockConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(LockConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
