import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './Components/header/header.component';
import { CatnavigationComponent } from './Components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './Components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './Components/products/products.component';
import { HttpClientModule} from '@angular/common/http'
import { SharedModule } from '../shared/shared.module';
import { CategoryService } from './services/category.service';
import { CategoriesStoreItem } from './services/CategoriesStoreItem';
import { ProductsService } from './services/product.service';
import { ProductsStoreItem } from './services/ProductsStoreItem';
import { ProductsgalleryComponent } from './Components/productsgallery/productsgallery.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CartStoreItem } from './services/Cart/cart.storeItem';
import { CartComponent } from './Components/cart/cart.component';
import { UserSignupComponent } from './Components/users/user-signup/user-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserloginComponent } from './Components/users/userlogin/userlogin.component';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { PastordersComponent } from './Components/pastorders/pastorders/pastorders.component';
import { AdminComponent } from '../admin/components/admin/admin.component';
import { AdminService } from '../admin/service/admin.service';
import { OrderDetailsComponent } from '../admin/components/order-details/order-details.component';
import { AddproductComponent } from '../admin/components/addproduct/addproduct.component';




@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent
    ,SidenavigationComponent, 
    ProductsComponent,
     ProductsgalleryComponent, 
     ProductdetailsComponent, CartComponent, UserSignupComponent, UserloginComponent, PastordersComponent , AdminComponent ,OrderDetailsComponent , AddproductComponent
  ],
  imports: [
    CommonModule,SharedModule , HttpClientModule , RouterModule  ,HomeRoutingModule , ReactiveFormsModule , FormsModule
  ],
  providers:[CategoryService , CategoriesStoreItem  , ProductsService,
    ProductsStoreItem,CartStoreItem ,UserService , OrderService  ,AdminService ]
})
export class HomeModule { }
