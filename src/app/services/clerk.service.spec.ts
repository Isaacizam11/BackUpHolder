/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClerkService } from './clerk.service';

describe('Service: Clerk', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClerkService]
    });
  });

  it('should ...', inject([ClerkService], (service: ClerkService) => {
    expect(service).toBeTruthy();
  }));
});
