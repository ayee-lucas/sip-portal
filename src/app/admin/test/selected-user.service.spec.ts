import { TestBed } from '@angular/core/testing';

import { UserSelectorService } from '../services/user-selector.service';

describe('SelectedUserService', () => {
  let service: UserSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
