import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/home/services/order.service';
import { Order, adminStart } from 'src/app/home/types/order.type';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit ,OnDestroy{

  orders : adminStart[]  = [];
  subscrption: Subscription = new Subscription();

  constructor(private orderservice:AdminService , private route: ActivatedRoute) {    }
  ngOnDestroy(): void {
   this.subscrption.unsubscribe();
  }
  url: string | null = null;
  ngOnInit(): void {

    this.loadDataTable('status=all');
  }


// loadDataTable(query: string){
//   this.orderservice.GetOrders(query).subscribe(
//     {
//       next: (order) => 
//       {
//         this.orders = order;
//       }}
// )
// }


loadDataTable(query: string) {
  this.subscrption.add(
    this.orderservice.GetOrders(query).subscribe({
      next: (order) => {
        this.orders = order;
      }
    })
  );
}
  
}
