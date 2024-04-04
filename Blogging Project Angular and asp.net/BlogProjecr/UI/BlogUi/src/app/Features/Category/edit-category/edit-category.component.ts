import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category-model';
import { AddCategoryRequest } from 'src/app/models/add-category-request-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent  implements OnInit , OnDestroy{

  id: string | null = null;
  paramSubscription?: Subscription;
  editCategorysubscibed?: Subscription;
  category: Category | undefined;

  constructor(private route: ActivatedRoute,private categoryService: CategoryService
    ,private router: Router){}

  //get the query of id parametr
  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          //get the data from the Api this categioy Id
          this.categoryService.getCategoryById(this.id).subscribe({
            next: res => {
              this.category = res;
            
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorysubscibed?.unsubscribe();
  }

  onEditSubmit(){

    //console.log(this.category, " ca")
   const UpdateCategoryRequest: AddCategoryRequest = {
    name: this.category?.name ?? '',
    urlHandle : this.category?.urlHandle ?? ''
   }
   if(this.id){
      this.editCategorysubscibed= this.categoryService.updateCategory(this.id , UpdateCategoryRequest).subscribe({
      next: response => {
        this.router.navigateByUrl('admin/categories');
      }
    })
  }

}

OnDelete()
{
  if(this.id)
  {
    this.categoryService.DeleteCategory(this.id).subscribe({
      next: response => {
        this.router.navigateByUrl('admin/categories');
      }
    })
  }
}
 

}
