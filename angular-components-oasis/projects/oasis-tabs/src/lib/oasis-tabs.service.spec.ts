import { TestBed } from '@angular/core/testing';

import { OasisTabsService } from './oasis-tabs.service';

describe('OasisTabsService', () => {
  let service: OasisTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OasisTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
