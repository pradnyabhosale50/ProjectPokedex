import { TestBed } from '@angular/core/testing';

import { PokeserveService } from './pokeserve.service';

describe('PokeserveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokeserveService = TestBed.get(PokeserveService);
    expect(service).toBeTruthy();
  });
});
