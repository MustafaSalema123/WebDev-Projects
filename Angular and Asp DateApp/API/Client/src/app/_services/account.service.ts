import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { PresenceService } from './presence.service';
import { environment } from '../../environments/environment';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
 //baseUrl = 'http://localhost:5000/api/';
  //baseUrl = environment.apiUrl;
  //Updat ethe current user data
  private currentUserSources = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSources.asObservable(); 

  constructor(private http: HttpClient, private presenceService: PresenceService) {  }
  //for add the pipe if we reload a pafe nad direct login
  Login(model: any)
  {
    //console.log(model + " model");
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {

          this.setCurrentUser(user);
          //localStorage.setItem('user', JSON.stringify(user))
          //this.currentUserSources.next(user);
          console.log("User " +user);
        }
      })
      
    )
  }

  register(model: any)
  {
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map(user => {
      
        if (user)
        {
          this.setCurrentUser(user);
        }
       // return user;
      })
      )
  }

  setCurrentUser(user: User)
  {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSources.next(user);
    this.presenceService.createhubConnection(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSources.next(null);
    this.presenceService.stopHubConnection();
  }


  getDecodedToken(token: string)
  {
    return JSON.parse(atob(token.split('.')[1]));
  }
}