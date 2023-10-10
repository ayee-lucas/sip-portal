import { TestBed } from '@angular/core/testing';

import { QueryService } from '../services/query.service';

describe('AuditQueryService', () => {
  let service: QueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
