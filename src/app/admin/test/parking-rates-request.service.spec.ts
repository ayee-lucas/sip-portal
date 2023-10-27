import { TestBed } from '@angular/core/testing';

import { ParkingRatesRequestService } from '../services/parking/parking-rates-request.service';

describe('ParkingRatesRequestService', () => {
  let service: ParkingRatesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingRatesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
