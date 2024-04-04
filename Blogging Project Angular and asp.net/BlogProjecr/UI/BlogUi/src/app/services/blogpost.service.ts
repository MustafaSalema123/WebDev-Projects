import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }


  baseUrl =  'http://192.168.5.148:5222/api/';

  AddBlogPost(data:AddBlogPost){
    return this.http.post<BlogPost>(this.baseUrl + "blogpost" , data);
  }

  GetAllBlogPost(){
    return this.http.get<BlogPost[]>(this.baseUrl + "blogpost" );
  }

  GetblogPostById(id: string){
    return this.http.get<BlogPost>(this.baseUrl + "blogpost/GetBlogPostById/" + id);
  }

  getBlogPostByUrlHandle(urlHandle: string){
    return this.http.get<BlogPost>(
      this.baseUrl + 
        'blogpost/GetBlogPostByUrlHandle/' +
        urlHandle
    );
  }


  UpdateblogPostById(id: string , model:any){
    return this.http.put<BlogPost>(this.baseUrl + "blogpost/" + id ,model);
  }

  DeleteblogPostById(id: string ){
    return this.http.delete<BlogPost>(this.baseUrl + "blogpost/" + id);
  }
}
