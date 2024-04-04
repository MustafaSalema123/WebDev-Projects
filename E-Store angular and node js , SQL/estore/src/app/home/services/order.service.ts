import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartStoreItem } from './Cart/cart.storeItem';
import { UserService } from './user.service';
import { DeliveryAddress } from '../types/cart.type';
import { Observable } from 'rxjs';
import { Order, OrderItem, OrderStatuse, PastOrder, PastOrderProduct } from '../types/order.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient , private cartStore: CartStoreItem , private userservice: UserService) {
    
   }

   saveOrder(deliveryAddress : DeliveryAddress , userEmail: string): Observable<any>
   {
  const url : string = 'http://localhost:5001/orders/add';
  const orderDetails: OrderItem[] = [];

  this.cartStore.cart.products.forEach(product => {
    const orderItem: OrderItem = {
      productId: product.product.id,
      price: product.product.price,
      qty: product.quantity,
      amount: product.amount,
    };
    orderDetails.push(orderItem);
  });
   const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
      orderstatus: OrderStatuse.Pending,
    };

    return this.http.post(url, order, {
      headers: { authorization: this.userservice.token },
    });
   }

   getOrders(userEmail: string): Observable<PastOrder[]> {
    const url: string = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`;

    return this.http.get<PastOrder[]>(url, {
      headers: { authorization: this.userservice.token },
    });
  }

  getOrdersAll() :Observable<Order>{
    const url: string = `http://localhost:5001/orders/allorders`;

    return this.http.get<Order>(url, {
      headers: { authorization: this.userservice.token },
    });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    const url: string = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`;

    return this.http.get<PastOrderProduct[]>(url, {
      headers: { authorization: this.userservice.token },
    });
  }

  
}
