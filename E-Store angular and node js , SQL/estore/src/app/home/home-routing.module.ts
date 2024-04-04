import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsgalleryComponent } from './Components/productsgallery/productsgallery.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CartComponent } from './Components/cart/cart.component';
import { UserSignupComponent } from './Components/users/user-signup/user-signup.component';
import { UserloginComponent } from './Components/users/userlogin/userlogin.component';
import { PastordersComponent } from './Components/pastorders/pastorders/pastorders.component';
import { authGuard } from './services/authguardPost';
import { AdminComponent } from '../admin/components/admin/admin.component';
import { OrderDetailsComponent } from '../admin/components/order-details/order-details.component';
import { AddproductComponent } from '../admin/components/addproduct/addproduct.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsgalleryComponent,
      },
      {
        path: 'product/:id',
        component: ProductdetailsComponent,
      },{
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'signup',
        component: UserSignupComponent
      },
      {
        path: 'login',
        component: UserloginComponent
      },
      {
        path: 'pastorders',
        component: PastordersComponent,
        canActivate: [authGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
       
      },
      {
        path: 'admin/details/:id',
        component: OrderDetailsComponent,
       
      },  {
        path: 'admin/addProduct',
        component: AddproductComponent,
       
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
