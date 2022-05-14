import { TestBed } from '@angular/core/testing';

import { PinturasService } from './pinturas.service';

describe('PinturasService', () => {
  let service: PinturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
