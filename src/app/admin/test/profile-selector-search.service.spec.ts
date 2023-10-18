import { TestBed } from '@angular/core/testing';
import { ProfileGetByIdService } from '../services/profiles/profile-get-by-id.service';

describe('ProfileSelectorSearchService', () => {
  let service: ProfileGetByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileGetByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
