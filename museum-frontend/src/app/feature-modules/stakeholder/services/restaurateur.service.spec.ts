import { TestBed } from '@angular/core/testing';

import { RestaurateurService as RestaurateurService } from './restaurateur.service';

describe('RestaurateurServiceService', () => {
  let service: RestaurateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
