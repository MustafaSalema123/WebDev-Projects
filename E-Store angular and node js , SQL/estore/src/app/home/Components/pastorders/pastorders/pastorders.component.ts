import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/home/services/order.service';
import { UserService } from 'src/app/home/services/user.service';
import { PastOrder, PastOrderProduct } from 'src/app/home/types/order.type';

@Component({
  selector: 'app-pastorders',
  templateUrl: './pastorders.component.html',
  styleUrls: ['./pastorders.component.css']
})
export class PastordersComponent implements OnInit , OnDestroy {

  pastOrderProducts: PastOrderProduct[] = [];
  pastOrder: PastOrder; 
  pastOrders: PastOrder[] = [];
  subscription: Subscription = new Subscription();

  constructor(private orderService:OrderService, private userService: UserService){}
  
  ngOnInit(): void {
    this.subscription.add(
      this.orderService.getOrders(this.userService.loggedInUser.email).subscribe({
        next: pastOrders => 
        {
          this.pastOrders = pastOrders;
        }
      })
    )
  }


  selectOrder(event: any): void {
    if(Number.parseInt(event.target.value) > 0)
    {
      this.pastOrder = this.pastOrders.filter((order) => 
      
        order.orderId === Number.parseInt(event.target.value)
      )[0];
      this.getOrderProducts(this.pastOrder.orderId);
    }else
    {
      this.pastOrder=  <any>undefined;
      
      this.pastOrderProducts = [];

    }
  }

  getOrderProducts(orderId: number): void {
    this.subscription.add(
      this.orderService.getOrderProducts(orderId).subscribe(products => {
        this.pastOrderProducts = products
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}







//checking data
// pastOrderProducts: PastOrderProduct[] = [
//   {
//     amount: 100,
//     price: 50,
//     productId: 1,
//     productImage: 'shop-1.jpg',
//     productName: 'Jacket',
//     qty: 2,
//   },
// ];

// pastOrder: PastOrder = {
//   address: 'Address goes here',
//   city: 'New Jersey',
//   orderDate: '03/01/23',
//   pin: '12345',
//   state: 'NY',
//   total: 100,
//   userName: 'Thomas Brown',
// };