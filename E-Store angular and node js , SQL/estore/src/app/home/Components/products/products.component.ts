import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/ProductsStoreItem';
import { CartStoreItem } from '../../services/Cart/cart.storeItem';
import { Product } from './products.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

 // products: Product[] = [];

  constructor(public productsStore: ProductsStoreItem , private cart: CartStoreItem
    ) {}

  // constructor(productsService: ProductsService) {
  //   productsService
  //     .getAllProducts()
  //     .subscribe((products) => (this.products = products));
  // }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

  

}
