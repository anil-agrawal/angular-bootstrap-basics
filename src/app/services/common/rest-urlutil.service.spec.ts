import { TestBed, inject } from '@angular/core/testing';

import { RestURLUtilService } from './rest-urlutil.service';

describe('RestURLUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestURLUtilService]
    });
  });

  it('should be created', inject([RestURLUtilService], (service: RestURLUtilService) => {
    expect(service).toBeTruthy();
  }));
});
