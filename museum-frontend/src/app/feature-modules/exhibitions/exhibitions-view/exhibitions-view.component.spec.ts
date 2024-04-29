import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionsViewComponent } from './exhibitions-view.component';

describe('ExhibitionsViewComponent', () => {
  let component: ExhibitionsViewComponent;
  let fixture: ComponentFixture<ExhibitionsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitionsViewComponent]
    });
    fixture = TestBed.createComponent(ExhibitionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
