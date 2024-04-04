import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/home/Components/products/products.type';
import { OrderDetails, OrderItem } from 'src/app/home/types/adminorder.type';
import { adminStart } from 'src/app/home/types/order.type';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  GetOrders(query?: string): Observable<adminStart[]>{

    let url : string = "http://localhost:5001/admin/orders";

    if(query)
    {
      url += '?' + query 
    }

    return this.http.get<adminStart[]>(url);

  }

  // GetOrdersDetailsById(id: number) {

  //   let url : string = "http://localhost:5001/admin/orders/Details/" + id;

  //   return this.http.get(url);

  // }
  getOrderDetails(orderId: number): Observable<{ orders: OrderDetails[], orderDetails: OrderItem[] }> {
    let url : string = "http://localhost:5001/admin/orders/Details/" + orderId;
    return this.http.get<{ orders: OrderDetails[], orderDetails: OrderItem[] }>(url);
  }

  // getOrderDetails(orderId: number): Observable<{ orderUser: OrderDetails[], orderItem: OrderItem[] }> {
  //   let url : string = "http://localhost:5001/admin/orders/Details/" + orderId;
  //   return this.http.get<{ orderUser: OrderDetails[], orderItem: OrderItem[] }>(url);
  // }

  UpdateOrdersDetailsById(orderUserData: OrderDetails) {

    let url : string = "http://localhost:5001/admin/orders/Details/" + orderUserData.orderId;

    return this.http.post<OrderDetails>(url , orderUserData);

  }


  AddProduct(product: Product) {

    let url : string = "http://localhost:5001/admin/addProduct";

    return this.http.post<Product>(url , product);

  }
}
