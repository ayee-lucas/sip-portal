import { TestBed } from '@angular/core/testing';

import { ParkingUpdateService } from '../services/parking/parking-update.service';

describe('ParkingUpdateService', () => {
  let service: ParkingUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
