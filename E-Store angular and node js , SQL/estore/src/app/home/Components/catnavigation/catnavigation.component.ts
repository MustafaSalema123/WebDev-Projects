import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/CategoriesStoreItem';
import { Category } from '../../types/category.type';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-catnavigation',
  templateUrl: './catnavigation.component.html',
  styleUrls: ['./catnavigation.component.css']
})
export class CatnavigationComponent {


  @Output() categoryClick: EventEmitter<number> = new  EventEmitter<number>();

  displayOptions: boolean = true;

  constructor(public categoryStore: CategoriesStoreItem  ,   private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true : false;
      });

  }

  OnCategoryClick(category: Category): void 
  {
    this.categoryClick.emit(category.id);
  }
}
