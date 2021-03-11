import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { MockCartService } from 'src/app/services/mock-cart.service';
import { Item } from 'src/app/models/item';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: Cart;
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
    }),
  });
  paymentMethod: FormControl = new FormControl('Mastercard', Validators.required);

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });
    this.cartService.getCart();
  }
  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
  }
  checkout() {
    this.orderService.createOrder(
      this.customerForm.value,
      this.paymentMethod.value
    );
    this.cartService.clearCart();
    this.customerForm.reset();
    this.paymentMethod.reset();
    this.orderService.lastOrder.subscribe((lastOrder: Order) => {
      this.router.navigate(['confirmation', lastOrder.id]);
    });
  }
}
