import { TestBed } from '@angular/core/testing';

import { ProfileSelectorService } from '../services/profile-selector.service';

describe('ProfileSelectorService', () => {
  let service: ProfileSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
