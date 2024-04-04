import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl =  'http://192.168.5.148:5222/api/'

  constructor(private http : HttpClient) { }

  addCategory(model: AddCategoryRequest){

    return this.http.post(this.baseUrl + 'category' , model);
  }

  GetAllCategory(){

    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  getCategoryById(id: string){

    return this.http.get<Category>(this.baseUrl + 'category/'+ id)
  }

  updateCategory(id: string, updateCategoryReq: any)
  {

    return this.http.put<Category>(this.baseUrl + 'category/' + id , updateCategoryReq);
  }


  DeleteCategory(id: string)
  {
    return this.http.delete<Category>(this.baseUrl + 'category/' + id );
  }
}
