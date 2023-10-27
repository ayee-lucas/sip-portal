import { TestBed } from '@angular/core/testing';

import { ParkingDeleteService } from '../services/parking/parking-delete.service';

describe('ParkingDeleteService', () => {
  let service: ParkingDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
