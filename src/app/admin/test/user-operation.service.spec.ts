import { TestBed } from '@angular/core/testing';

import { UserRequestService } from '../services/user-request.service';

describe('UserOperationService', () => {
  let service: UserRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
