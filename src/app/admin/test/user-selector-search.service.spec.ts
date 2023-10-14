import { TestBed } from '@angular/core/testing';

import { UserSelectorSearchService } from '../services/users/user-selector-search.service';

describe('UserSelectorSearchService', () => {
  let service: UserSelectorSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSelectorSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
