import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/ProductsStoreItem';

@Component({
  selector: 'app-productsgallery',
  templateUrl: './productsgallery.component.html',
  styleUrls: ['./productsgallery.component.css']
})
export class ProductsgalleryComponent {
  constructor(private productsStoreItem: ProductsStoreItem) {}

  onSelectSubCategory(subCategoryId: number) {
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
}
