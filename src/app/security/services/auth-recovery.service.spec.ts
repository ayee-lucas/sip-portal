import { TestBed } from '@angular/core/testing';

import { AuthRecoveryService } from './auth-recovery.service';

describe('AuthRecoveryService', () => {
  let service: AuthRecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
