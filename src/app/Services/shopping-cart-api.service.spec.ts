import { TestBed } from '@angular/core/testing';

import { ShoppingCartAPIService } from './shopping-cart-api.service';

describe('ShoppingCartAPIService', () => {
  let service: ShoppingCartAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
