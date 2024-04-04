import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogListComponent } from './Features/BlogPost/blog-list/blog-list.component';
import { AddblogpostListComponent } from './Features/BlogPost/addblogpost-list/addblogpost-list.component';
import { EditBlogpostComponent } from './Features/BlogPost/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './Public/Home/home/home.component';
import { BlogDetailsComponent } from './Public/blog-details/blog-details.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { AuthGuard } from './Features/Auth/Guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent
  },
  {
    path: 'admin/blogposts',
    component: BlogListComponent
  },
  {
    path: 'admin/blogposts/add',
    component: AddblogpostListComponent
  } ,
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent
   
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
