import { TestBed } from '@angular/core/testing';

import { B2bFooterService } from './b2b-footer.service';

describe('B2bFooterService', () => {
  let service: B2bFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(B2bFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
