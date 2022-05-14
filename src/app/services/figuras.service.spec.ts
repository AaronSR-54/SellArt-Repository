import { TestBed } from '@angular/core/testing';

import { FigurasService } from './figuras.service';

describe('FigurasService', () => {
  let service: FigurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
