import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Apiurl = 'http://localhost:8080'
  constructor(private httpClient:HttpClient) { }

  signUp(data: any) 
  {
    return this.httpClient.post(this.Apiurl + '/user/signup', data , {headers: new HttpHeaders().set('Content-Type' , "application/json")})
  }
}
