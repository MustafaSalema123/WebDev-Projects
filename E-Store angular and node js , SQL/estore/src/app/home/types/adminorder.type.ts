// export interface OrdersDetailsData {
//   orderDetails: OrderDetail[]
// }

// export interface OrderDetail {
//   orderId: number
//   productId: number
//   qty: number
//   price: string
//   amount: string
//   product_name: string
//   product_img: string
// }

// export interface Order {
//   orderId: number
//   orderDate: string
//   userName: string
//   address: string
//   city: string
//   state: string
//   pin: string
//   total: string
//   userId: number
//   orderstatus: string
// }


export interface OrderDetails {
  orderId: number;
  orderDate: string;
  userName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  total: string;
  userId: number;
  orderstatus: string;
}

export interface OrderItem {
  orderId: number;
  productId: number;
  qty: number;
  price: string;
  amount: string;
  product_name: string;
  product_img: string;
}

// export interface  OrderDetailsUpdate {
//     orderId: number;
//     orderDate: string;
//     userName: string;
//     address: string;
//     city: string;
//     state: string;
//     pin: string;
//     total: string;
//     orderstatus: string;
//   }
  
//   export interface  OrderDetailsAndProduct {
//    orderId: number
//   orderDate: string
//   userName: string
//   address: string
//   city: string
//   state: string
//   pin: string
//   total: string
//   userId: number
//   orderstatus: string
//   productId: number
//   qty: number
//   price: string
//   product_name: string
//   product_img: string
//   }
  
  // orderId: number
  // orderDate: string
  // userName: string
  // address: string
  // city: string
  // state: string
  // pin: string
  // total: string
  // userId: number
  // orderstatus: string
  // productId: number
  // qty: number
  // price: string
  // product_name: string
  // product_img: string