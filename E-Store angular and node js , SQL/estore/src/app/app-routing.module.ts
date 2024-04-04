import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: '/home/products', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

// const routes: Routes = [
//   {path: 'home' , 
//   loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),}, //component: HomeComponent
//   { path: '', redirectTo: '/home/products', pathMatch: 'full' },
//  // {path: '' ,redirectTo: '/home' , pathMatch: 'full'}, //  do full if we do prefix thn link will be come in same page when redirect it
//   {path:'**' , component: NotfoundComponent}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}