import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products/products.type';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product.service';
import { CartStoreItem } from '../../services/Cart/cart.storeItem';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent  implements OnInit, OnDestroy {

  product: Product;
  subscriptions: Subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = product[0];
       //console.log("addada ",product);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addToCart()
  {
    this.cart.addProduct(this.product);

  }
}
