import { TestBed, async, inject } from '@angular/core/testing';

import { ClassGuard } from './class.guard';

describe('ClassGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassGuard]
    });
  });

  it('should ...', inject([ClassGuard], (guard: ClassGuard) => {
    expect(guard).toBeTruthy();
  }));
});
