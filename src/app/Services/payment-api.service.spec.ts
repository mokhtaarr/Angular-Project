import { TestBed } from '@angular/core/testing';

import { PaymentAPIService } from './payment-api.service';

describe('PaymentAPIService', () => {
  let service: PaymentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
