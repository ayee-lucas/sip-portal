import { TestBed } from '@angular/core/testing';

import { ParkingRequestService } from '../services/parking/parking-request.service';

describe('ParkingRequestService', () => {
  let service: ParkingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
