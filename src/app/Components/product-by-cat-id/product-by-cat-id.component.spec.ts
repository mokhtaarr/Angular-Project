import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByCatIdComponent } from './product-by-cat-id.component';

describe('ProductByCatIdComponent', () => {
  let component: ProductByCatIdComponent;
  let fixture: ComponentFixture<ProductByCatIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductByCatIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductByCatIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
