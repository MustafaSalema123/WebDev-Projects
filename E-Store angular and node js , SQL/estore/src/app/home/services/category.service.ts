import { Injectable } from '@angular/core';
import { Category } from '../types/category.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'  // provide a singleton object of this servoce in the root of the application
// })

@Injectable()
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  getAllCategories(): Observable<Category[]>
  {
     let url: string = 'http://localhost:5001/productCategories';
    // if(query)
    // {
   
    //   url += '?' + query ;
    // }

    return this.httpClient.get<Category[]>(url);
  }
}
