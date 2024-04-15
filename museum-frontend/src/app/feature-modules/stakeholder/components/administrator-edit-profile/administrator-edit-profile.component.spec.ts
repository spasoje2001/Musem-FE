import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorEditProfileComponent } from './administrator-edit-profile.component';

describe('AdministratorEditProfileComponent', () => {
  let component: AdministratorEditProfileComponent;
  let fixture: ComponentFixture<AdministratorEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorEditProfileComponent]
    });
    fixture = TestBed.createComponent(AdministratorEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
