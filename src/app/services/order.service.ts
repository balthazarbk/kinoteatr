import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Order, PaymentMethod, OrderRow } from '../models/order';
import { Customer } from '../models/customer';
import { CartService } from './cart.service';
import { Cart } from '../models/cart';
import { IOrderService } from '../interfaces/iorder-service';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  orders: Subject<Order[]> = new Subject<Order[]>();
  currentOrders: Order[] = [];
  lastOrder: Subject<Order> = new Subject<Order>();
  private ordersAPIUrl =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/orders';
  private companyId = 8888;
  private paramsCompanyId: HttpParams = new HttpParams().set('companyId', String(this.companyId));

  constructor(private http: HttpClient, private cartService: CartService) {}

  getOrders() {
    this.http
      .get(this.ordersAPIUrl + '?' + this.paramsCompanyId)
      .subscribe((orders: Order[]) => {
        this.orders.next(orders);
        this.currentOrders = orders;
      });
  }
  createOrder(
    customerInfo: Customer,
    paymentMethodAsString: PaymentMethod
  ): void {
    const subject = this.cartService.cart.subscribe((cart: Cart) => {
      // orderRows from cartItems
      const orderRows: OrderRow[] = [];
      cart.items.forEach((item) => {
        const orderRow = new OrderRow();
        orderRow.productId = item.id;
        orderRows.push(orderRow);
      });
      // Date.now()
      const created = new Date(Date.now()).toLocaleString('sv-SV');
      // body (raw)
      const raw = JSON.stringify({
        companyId: 8888,
        created,
        createdBy: JSON.stringify(customerInfo),
        paymentMethod: paymentMethodAsString,
        totalPrice: cart.totalPrice,
        status: 0,
        orderRows,
      });
      // httpOptions
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: raw,
      };
      // post request to Orders API
      this.http
        .post(this.ordersAPIUrl, raw, httpOptions)
        .subscribe((response: Order) => {
          this.lastOrder.next(response);
        });
    });
    this.cartService.getCart();
    subject.unsubscribe();
  }
  deleteOrderBy(orderId: number) {
    this.http
      .delete(this.ordersAPIUrl + '/' + orderId)
      .subscribe((deletedOrder: Order) => {
        const newCurrentOrders = this.currentOrders.filter(
          (order) => order.id !== deletedOrder.id
        );
        this.orders.next(newCurrentOrders);
        this.currentOrders = newCurrentOrders;
      });
  }
}
