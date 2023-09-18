import { TestBed } from '@angular/core/testing';

import { queryService } from './query.service';

describe('queryService', () => {
  let service: queryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(queryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
