import { TestBed } from '@angular/core/testing';
import { ProfileSelectorSearchService } from '../services/profiles/profile-selector-search.service';

describe('ProfileSelectorSearchService', () => {
  let service: ProfileSelectorSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSelectorSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
