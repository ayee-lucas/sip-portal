import { TestBed } from '@angular/core/testing';

import { ActionSelectorService } from '../services/parking/action-selector.service';

describe('ActionSelectorService', () => {
  let service: ActionSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
