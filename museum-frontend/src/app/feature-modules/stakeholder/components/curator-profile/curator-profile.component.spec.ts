import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorProfileComponent } from './curator-profile.component';

describe('CuratorProfileComponent', () => {
  let component: CuratorProfileComponent;
  let fixture: ComponentFixture<CuratorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuratorProfileComponent]
    });
    fixture = TestBed.createComponent(CuratorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
