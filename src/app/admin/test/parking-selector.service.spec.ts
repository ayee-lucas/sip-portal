import { TestBed } from '@angular/core/testing';

import { ParkingSelectorService } from '../services/parking/parking-selector.service';

describe('ParkingSelectorService', () => {
  let service: ParkingSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
