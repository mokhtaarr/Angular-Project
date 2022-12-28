import { TestBed } from '@angular/core/testing';

import { ProductOfferApiService } from './product-offer-api.service';

describe('ProductOfferApiService', () => {
  let service: ProductOfferApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOfferApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
