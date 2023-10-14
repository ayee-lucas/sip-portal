import { TestBed } from '@angular/core/testing';

import { UserNewService } from '../services/users/user-new.service';

describe('AddUserService', () => {
  let service: UserNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
