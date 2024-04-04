export interface OrderItem {
    productId: number;
    qty: number;
    price: number;
    amount: number;
  }
  
  // export interface Orderstatuses {
  //   Processing: string;
  //   Pending: string;
  //   Awaitingpayment: string;
  //   Shipped: string;
  //   Completed: string;
  //   Confirmed: string;
  // }

  export const OrderStatuse = {
    Pending: "Pending",
    Processing: "Processing",
    Awaitingpayment: "Awaitingpayment",
    Shipped: "Shipped",
    Completed: "Completed",
    Confirmed: "Confirmed",
    cancle: "cancle"
  };
  export interface Order {
    
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    userEmail: string;
    orderDetails: OrderItem[];
    orderstatus : string ;
  }
  
  export interface PastOrder {
    orderstatus : string ;
    orderId: number;
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    orderDate: string;
  }
  
  export interface PastOrderProduct {
    productId: number;
    productImage: string;
    qty: number;
    price: number;
    amount: number;
    productName: string;
  }

  export interface adminStart {
    orderId: number
    userName: string
    total: string
    orderstatus: string
  }
  