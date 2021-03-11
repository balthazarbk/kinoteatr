import { Cart } from '../models/cart';
import { Subject } from 'rxjs';
import { Product } from '../models/product';
import { Item } from '../models/item';

export interface ICartService {
  cart: Subject<Cart>;
  items: Item[];
  getCart(): void;
  addToCart(product: Product): void;
  removeFromCart(itemToRemove: Item): void;
  clearCart(): void;
}
