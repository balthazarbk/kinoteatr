import { Item } from './item';

export class Cart {
  items: Item[] = [];
  get totalPrice() {
    if (this.items.length > 0) {
      const prices = this.items.map((item) => item.price);
      return prices.reduce((a, b) => a + b, 0);
    } else {
      return 0;
    }
  }
}
