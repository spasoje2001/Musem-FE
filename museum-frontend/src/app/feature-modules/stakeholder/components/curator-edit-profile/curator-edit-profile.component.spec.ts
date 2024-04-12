import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorEditProfileComponent } from './curator-edit-profile.component';

describe('CuratorEditProfileComponent', () => {
  let component: CuratorEditProfileComponent;
  let fixture: ComponentFixture<CuratorEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuratorEditProfileComponent]
    });
    fixture = TestBed.createComponent(CuratorEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
