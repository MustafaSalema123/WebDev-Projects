import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from 'src/app/models/add-category-request-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model : AddCategoryRequest;
private addCategorySubscription?: Subscription;
  constructor(private categoryService:CategoryService , private router: Router){
    this.model={
      name:'',
      urlHandle:''
    }; 
  }
 
  onFromSubmit()
  {
    //console.log("dadada ", this.model);
   this.addCategorySubscription=  this.categoryService.addCategory(this.model).subscribe({
      next: response=>{
          this.router.navigateByUrl('/admin/categories')
      },
      error: err => { console.log(err)} 
    });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

  backToList(){
  this.router.navigateByUrl('/admin/categories')
  }

}

