import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderDetails, OrderItem } from 'src/app/home/types/adminorder.type';
import {   OrderStatuse } from 'src/app/home/types/order.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnDestroy, OnInit {

  orderDetailForm: FormGroup;
  orderId: number;
  orderItemDetails: OrderItem[];
  orderUserDetail: OrderDetails;

   defaultDeliveryDate : string;

  subscriptions: Subscription = new Subscription();
  selectedStatus: string = 'Pending'; // Set default status to 'Pending'

  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error

   orderStatus = Object.keys(OrderStatuse).map(key => ({ value: key, label: key }));
  constructor(private fb: FormBuilder , private router: Router ,private route: ActivatedRoute, private adminService: AdminService)
   {

       this.orderUserDetail = {
      orderId: 0,
      orderDate: '',
      userName: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      total: '',
      userId: 0,
      orderstatus: ''
    }

   // this.initializeForm();
   const id: number = Number(this.route.snapshot.paramMap.get('id'));
   this.subscriptions.add(this.adminService.getOrderDetails(id)
   .subscribe({
    next: (data) => 
    {
      this.orderItemDetails = data.orderDetails;
      this.orderUserDetail = data.orders[0];
      this.initializeForm();
    }
   }));


}
 
  ngOnInit(): void {

    this.initializeForm();
      //  this.route.params.subscribe(params => {
  //   this.orderId = params['id'];
  //   this.getOrderDetails();
  //   //this.initializeForm();
  // });


  const defaultOrderDate = moment().format('YYYY-MM-DD'); // Current date
  this.defaultDeliveryDate = moment(defaultOrderDate).add(7, 'days').format('YYYY-MM-DD'); // Add 7 days


  }

  // getOrderDetails(): void {
  //   this.adminService.getOrderDetails(this.orderId)
  //     .subscribe(data => {
  //       this.orderItemDetails = data.orderItem;
  //       this.orderUserDetail = data.orderUser[0];
        
  //      // this.initializeForm();
  //     });


      
  // }

  initializeForm(): void {
    this.orderDetailForm = this.fb.group({
      orderDate: [this.orderUserDetail?.orderDate || '', Validators.required],
      userName: [this.orderUserDetail?.userName || '', Validators.required],
      address: [this.orderUserDetail?.address || '', Validators.required],
      city: [this.orderUserDetail?.city || '', Validators.required],
      state: [this.orderUserDetail?.state || '', Validators.required],
      pin: [this.orderUserDetail?.pin || '', Validators.required],
      total: [this.orderUserDetail?.total || '', Validators.required],
      orderstatus: [this.orderUserDetail?.orderstatus || '', Validators.required],
      deliveryDate: [this.defaultDeliveryDate]
    });
    this.selectedStatus = this.orderUserDetail?.orderstatus || '';
   
  }
  
    navigateToOrders(): void {
    this.router.navigate(['home/admin']);
  }

    selectStatu(event: any): void {
    // Perform actions based on the selected status
    
    this.selectedStatus = event.target.value;
  //  console.log('Selected Status:', this.selectedStatus);

  }

   onSubmit()
  {
    const orders : OrderDetails =
    {
  
      orderId: this.orderUserDetail.orderId,
      orderDate: new Date(this.orderDetailForm.get('orderDate')?.value).toISOString(), // Convert date to ISO string
      userName: this.orderDetailForm.get('userName')?.value,
      address: this.orderDetailForm.get('')?.value,
      city: this.orderDetailForm.get('city')?.value,
      state: this.orderDetailForm.get('state')?.value,
      pin: this.orderDetailForm.get('pin')?.value,
      total: this.orderDetailForm.get('total')?.value,
      userId: this.orderUserDetail.userId,
      orderstatus: this.orderDetailForm.get('orderstatus')?.value,
      

    }

    this.adminService.UpdateOrdersDetailsById(orders).subscribe(
      {
       next: (result) => 
       {
        this.alertMessage = 'Order Update successfully';
        this.alertType = 0;
        setTimeout(() => {
          
        this.navigateToOrders();
        //   this.location.back();
        }, 400);
       },
       error: (error) => {
         this.alertMessage = error.message;
         this.alertType = 2;
       },
      
      });

      
  }
  ngOnDestroy(): void {
    
  }


  // orderDetailForm: FormGroup;
  // orderDetail: Order  ;
  // //orderDetailProduct: OrderDetailsAndProduct  | undefined;
  // subscriptions: Subscription = new Subscription();
  // selectValue : number;

  // selectedStatus: string = 'Pending'; // Set default status to 'Pending'

  // alertMessage: string = '';
  // alertType: number = 0; // 0-success, 1-warning, 2-error

  // // Define your statuses
  // orderStatus = Object.keys(OrderStatuse).map(key => ({ value: key, label: key }));
  // // private loggedInUserInfo: BehaviorSubject<OrderDetails> = new BehaviorSubject(<OrderDetails>{});

  // constructor(private fb: FormBuilder , 
  //   private adminservice:AdminService , 
  //   private route: ActivatedRoute , 
  //    private location: Location ,
  //    private router: Router  ) {

  //   this.orderDetail = {

  //     orderId: 0,
  //     orderDate: '',
  //     userName: '',
  //     address: '',
  //     city: '',
  //     state: '',
  //     pin: '',
  //     total: '',
  //     orderstatus: ''

  //   }

  //  // this.initializeForm();

  //   const id: number = Number(this.route.snapshot.paramMap.get('id'));
  //   this.subscriptions.add(
  //     this.adminservice.GetOrdersDetailsById(id).subscribe({
  //       next: orders => {
  //         this.orderDetail = orders[0];
  //         this.orderDetailProduct = orders[0];
  //           console.log("Form initialized:",  this.orderDetailProduct);
  //         this.initializeForm();
  //       },
  //       error: error => {
  //         console.error('Error fetching order details:', error);
  //       }
  //     })
  //   );
  // }

  // navigateToOrders(): void {
  //   this.router.navigate(['home/admin']);
  // }


  // initializeForm(): void {
  //   this.orderDetailForm = this.fb.group({
  //     orderDate: [this.orderDetail?.orderDate || '', Validators.required],
  //     userName: [this.orderDetail?.userName || '', Validators.required],
  //     address: [this.orderDetail?.address || '', Validators.required],
  //     city: [this.orderDetail?.city || '', Validators.required],
  //     state: [this.orderDetail?.state || '', Validators.required],
  //     pin: [this.orderDetail?.pin || '', Validators.required],
  //     total: [this.orderDetail?.total || '', Validators.required],
  //     orderstatus: [this.orderDetail?.orderstatus || '', Validators.required]
  //   });
  //   this.selectedStatus = this.orderDetail?.orderstatus || '';
  //  // console.log("Form initialized:", this.orderDetailForm);
  // }
  
  // ngOnInit(): void {

  
  //     this.initializeForm();
  
  // }


  // selectStatu(event: any): void {
  //   // Perform actions based on the selected status
    
  //   this.selectedStatus = event.target.value;
  //   //this.selectedStatus= this.orderDetail.orderstatus;
  // //  console.log('Selected Status:', this.selectedStatus);

  // }

  // // ngOnDestroy(): void {
  // //   this.subscriptions.unsubscribe();
  // // }
  // onSubmit()
  // {
  //   const orderdetails : OrderDetailsUpdate =
  //   {
  
  //     orderId: this.orderDetail.orderId,
  //     orderDate: new Date(this.orderDetailForm.get('orderDate')?.value).toISOString(), // Convert date to ISO string
  //     userName: this.orderDetailForm.get('userName')?.value,
  //     address: this.orderDetailForm.get('')?.value,
  //     city: this.orderDetailForm.get('city')?.value,
  //     state: this.orderDetailForm.get('state')?.value,
  //     pin: this.orderDetailForm.get('pin')?.value,
  //     total: this.orderDetailForm.get('total')?.value,
  //     orderstatus: this.orderDetailForm.get('orderstatus')?.value,

  //   }

  //   this.adminservice.UpdateOrdersDetailsById(orderdetails).subscribe(
  //     {
  //      next: (result) => 
  //      {
  //       this.alertMessage = 'Order Update successfully';
  //       this.alertType = 0;
  //       setTimeout(() => {
          
  //       this.navigateToOrders();
  //       //   this.location.back();
  //       }, 400);
  //      },
  //      error: (error) => {
  //        this.alertMessage = error.message;
  //        this.alertType = 2;
  //      },
      
  //     });

      
  // }


  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
  // }

  
}
