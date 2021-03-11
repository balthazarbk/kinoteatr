import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subject: Subscription;
  columnsToDisplay = [
    'orderId',
    'created',
    'email',
    'fullName',
    'address',
    'productIds',
    'paymentMethod',
    'totalPrice',
    'status',
    'actions',
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.subject = this.orderService.orders.subscribe((orders: Order[]) => {
      const allOrders: Order[] = orders.map((order: Order) => {
        function isJson(str) {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        }
        if (isJson(order.createdBy)) {
          order.createdBy = JSON.parse(order.createdBy);
        }
        return order;
      });
      this.orders = allOrders;
    });
    this.orderService.getOrders();
  }
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
  deleteOrderBy(orderId: number) {
    this.orderService.deleteOrderBy(orderId);
    this.orders = this.orderService.currentOrders;
  }
}
