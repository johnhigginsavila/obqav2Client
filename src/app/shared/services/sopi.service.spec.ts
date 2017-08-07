import { TestBed, inject } from '@angular/core/testing';

import { SopiService } from './sopi.service';

describe('SopiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SopiService]
    });
  });

  it('should be created', inject([SopiService], (service: SopiService) => {
    expect(service).toBeTruthy();
  }));
});
