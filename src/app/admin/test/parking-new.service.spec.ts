import { TestBed } from '@angular/core/testing';

import { ParkingNewService } from '../services/parking/parking-new.service';

describe('ParkingNewService', () => {
  let service: ParkingNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
