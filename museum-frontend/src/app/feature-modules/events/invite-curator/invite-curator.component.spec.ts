import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCuratorComponent } from './invite-curator.component';

describe('InviteCuratorComponent', () => {
  let component: InviteCuratorComponent;
  let fixture: ComponentFixture<InviteCuratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteCuratorComponent]
    });
    fixture = TestBed.createComponent(InviteCuratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
