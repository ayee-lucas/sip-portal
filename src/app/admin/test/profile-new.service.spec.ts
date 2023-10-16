import { TestBed } from '@angular/core/testing';

import { ProfileNewService } from '../services/profiles/profile-new.service';

describe('ProfileNewService', () => {
  let service: ProfileNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
