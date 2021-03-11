import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[];
  subject: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subject = this.productsService.products.subscribe((products: Product[]) => {
      // filtering out products with price = 0 to avoid products made by mistake.
      const filteredProducts = products.filter((product: Product) => {
        return product.price !== 0;
      });
      this.products = filteredProducts;
    });
    this.productsService.getProducts();
  }
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

}
