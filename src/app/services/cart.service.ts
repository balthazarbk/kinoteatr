import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { Item } from '../models/item';
import { ICartService } from '../interfaces/icart-service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements ICartService {
  cart: Subject<Cart> = new Subject<Cart>();
  items: Item[] = [];

  constructor() {}

  getCart(): void {
    const updatedCart = new Cart();
    updatedCart.items = this.items;
    this.cart.next(updatedCart);
  }
  addToCart(product: Product): void {
    const newItem = new Item();
    newItem.id = product.id;
    newItem.name = product.name;
    newItem.price = product.price;
    newItem.imageUrl = product.imageUrl;
    this.items.push(newItem);
  }
  removeFromCart(itemToRemove: Item): void {
    const indexOfItemToRemove = this.items.indexOf(itemToRemove);
    this.items.splice(indexOfItemToRemove, 1);
  }
  clearCart(): void {
    this.items.splice(0, this.items.length);
  }
}
