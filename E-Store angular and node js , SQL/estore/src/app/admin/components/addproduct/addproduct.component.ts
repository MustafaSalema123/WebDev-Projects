import { Component } from '@angular/core';
import { Product } from 'src/app/home/Components/products/products.type';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  productForm: FormGroup;
  product: Product = {
    id: 0,
    product_name: '',
    product_img: '',
    price: 0,
    ratings: 0,
    product_description: '',
    category_id: 0,
    keywords: ''
  };

  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error

  constructor( private adminService: AdminService , private router: Router){}

  addProduct()
  {
    console.log(this.product , " sdadsa ");
    this.adminService.AddProduct(this.product).subscribe(
      {
        next: _ =>
        {
          this.alertMessage = 'Product Add successfully';
          this.alertType = 0;
        },error :err =>  
        {
          this.alertType = 2;
          this.alertMessage = err.error.message;
        }
        
      })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Assuming you want to save the file name with .jpg extension
    this.product.product_img = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
  }

  navigateToOrders()
  {
     this.router.navigateByUrl('home/admin')
  }
}
