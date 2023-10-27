import { TestBed } from '@angular/core/testing';

import { ParkingGetByIdService } from '../services/parking/parking-get-by-id.service';

describe('ParkingGetByIdService', () => {
  let service: ParkingGetByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingGetByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
