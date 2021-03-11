export class Order {
  id?: number;
  companyId: 8888;
  createdBy: any;
  created?: Date;
  status = 0;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  orderRows: OrderRow[];
}

export enum PaymentMethod {
  Mastercard = 'MASTERCARD',
  Visa = 'VISA',
  Klarna = 'KLARNA',
}

export class OrderRow {
  id?: number;
  productId: number;
  amount = 1;
  product?: OrderItem;
}

export class OrderItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  productCategory = [];
}
