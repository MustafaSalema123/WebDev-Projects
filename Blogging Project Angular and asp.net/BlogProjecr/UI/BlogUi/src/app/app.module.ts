import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/Component/navbar/navbar.component';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/Category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogListComponent } from './Features/BlogPost/blog-list/blog-list.component';
import { AddblogpostListComponent } from './Features/BlogPost/addblogpost-list/addblogpost-list.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './Features/BlogPost/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/component/image-selector/image-selector.component';
import { HomeComponent } from './Public/Home/home/home.component';
import { BlogDetailsComponent } from './Public/blog-details/blog-details.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { RegisterComponent } from './Features/Auth/register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogListComponent,
    AddblogpostListComponent,
    EditBlogpostComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
