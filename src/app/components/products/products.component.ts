import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MockCartService } from 'src/app/services/mock-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products: Product[];
  placeholder = '../../assets/images/placeholder.png';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  imgNotFound(e) {
    e.target.src = this.placeholder;
  }
  addToCart(product: Product) {
    const allItemsId = this.cartService.items.map(item => item.id);
    if (allItemsId.indexOf(product.id) > -1) {
      console.log('Item already bought (function to warn user in backlog)');
    } else {
      this.cartService.addToCart(product);
    }
  }
}
