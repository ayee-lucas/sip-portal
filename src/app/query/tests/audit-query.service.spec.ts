import { TestBed } from '@angular/core/testing';

import { AuditQueryService } from '../services/audit-query.service';

describe('AuditQueryService', () => {
  let service: AuditQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
