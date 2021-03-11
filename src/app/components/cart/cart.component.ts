import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { MockCartService } from 'src/app/services/mock-cart.service';
import { Item } from 'src/app/models/item';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], totalPrice: 0 };
  cartCreated = false;

  constructor(private cartService: CartService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe(cart => {
      this.cart = cart;
      this.cartCreated = cart.items.length > 0 ? true : false;
    });
    this.cartService.getCart();
    this.productsService.getCategories();
  }
  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
  }
}
