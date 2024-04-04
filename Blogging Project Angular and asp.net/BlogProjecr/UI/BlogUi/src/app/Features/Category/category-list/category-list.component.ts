import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  //categories : Category[] | undefined;
  categories$? : Observable<Category[]> ;


  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    // this.categoryService.GetAllCategory().subscribe({
    //   next: response => {
    //     this.categories = response;
    //   }
    // })

    this.categories$ =  this.categoryService.GetAllCategory();
  }


  
  

}
