import { Subject } from 'rxjs';
import { Order, PaymentMethod } from '../models/order';
import { Customer } from '../models/customer';

export interface IOrderService {
  orders: Subject<Order[]>;
  currentOrders: Order[];
  lastOrder: Subject<Order>;
  getOrders(): void;
  createOrder(customerInfo: Customer, paymentMethodAsString: PaymentMethod): void;
  deleteOrderBy(orderId: number): void;
}
