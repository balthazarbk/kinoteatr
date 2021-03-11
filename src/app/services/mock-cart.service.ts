import { Injectable } from '@angular/core';
import { ICartService } from '../interfaces/icart-service';
import { Cart } from '../models/cart';
import { Subject } from 'rxjs';
import { Product } from '../models/product';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class MockCartService implements ICartService {
  cart: Subject<Cart> = new Subject<Cart>();
  items: Item[] = [
    {
      id: 76,
      name: 'The Dark Knight',
      price: 199,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
      description:
        'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice',
      year: 2008,
      categories: [
        { id: 5, name: 'Action' },
        { id: 6, name: 'Thriller' },
      ],
    },
    {
      id: 89,
      name: 'The Departed',
      price: 100,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg',
      description:
        'Desc The Departed Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto odio id placeat distinctio adipisci, facere asperiores aperiam culpa veniam, qui, aspernatur ad saepe fuga recusandae. Illum natus quam, atque dicta commodi quod ducimus ipsa voluptatibus, id dolor cupiditate. Officiis, dicta.',
      year: 1991,
      categories: [
        { id: 7, name: 'Lorem' },
        { id: 8, name: 'Ipsum' },
      ],
    },
    {
      id: 96,
      name: 'Raiders of the Lost Ark',
      price: 79,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_SY1000_CR0,0,664,1000_AL_.jpg',
      description:
        'Desc Raiders Of the Lost Ark Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto odio id placeat distinctio adipisci, facere asperiores aperiam culpa veniam.',
      year: 1905,
      categories: [
        { id: 5, name: 'Comedy' },
        { id: 8, name: 'Ipsum' },
      ]
    },
  ];

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
