import { TestBed, inject } from '@angular/core/testing';

import { RestUtilService } from './rest-util.service';

describe('RestUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestUtilService]
    });
  });

  it('should be created', inject([RestUtilService], (service: RestUtilService) => {
    expect(service).toBeTruthy();
  }));
});
