import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User-model';
import { LoginResponse } from '../models/login-response-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl =  'http://192.168.5.148:5222/api/';
  $user = new BehaviorSubject<User | undefined>(undefined);

  
  constructor(private http:HttpClient , private cookieService:CookieService) { }

  login(request : LoginRequest)
  {

    return this.http.post<LoginResponse>(this.baseUrl + "auth/login",{
      email: request.email,
      password: request.password,
    });
  }

  setUser(user: User) {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles?.split(','),
      };
    }

    return undefined;
  }

  logout(){
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
  }
}
