import { TestBed } from '@angular/core/testing';

import { MockCartService } from './mock-cart.service';
import { Product } from '../models/product';

describe('MockCartService', () => {
  let service: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to cart', () => {
    expect(service.items.length).toBe(3);
    const product: Product = new Product();
    product.name = 'Test Title';
    product.id = 78;
    product.description = 'Test Desc';
    product.year = 1908;
    product.imageUrl = 'test Url';
    product.price = 199;
    service.addToCart(product);
    expect(service.items.length).toBe(4);
  });

});
