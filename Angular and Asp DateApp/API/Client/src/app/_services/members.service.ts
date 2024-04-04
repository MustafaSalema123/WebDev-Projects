import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';

import { Member } from '../_models/member';
//import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {


 // baseUrl = 'http://localhost:5000/api/';
  baseUrl = environment.apiUrl;
  members: Member[] = []
  memberCache = new Map();

  user: User | undefined;
  userParams: UserParams | undefined;

  //paginateResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;

  constructor(private http: HttpClient, private accountService: AccountService) {

    
  

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>
      {
        if (user) {
          this.userParams = new UserParams(user),
            this.user = user
        }
      }
    })

  }

  getUserParams() {
    return this.userParams;
  }
  SetUserParams(params: UserParams)
  {
    this.userParams = params;
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  //New mthod
  getMembers(userParams: UserParams)
  {
    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response) return of(response);

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + "user", params, this.http).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );

    //return this.getPaginationResult<Member[]>(this.baseUrl  + "user", params);
  }


  

    

  getMember(username: string)
  {
    //const member = this.members.find(x => x.name === name);
    //if (member) return of(member);

    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) return of(member);
    

    return this.http.get<Member>(this.baseUrl + "user/" + username);
  }

  UpdateMember(member: Member)
  {
    return this.http.put(this.baseUrl + "user", member).pipe(
      map(() => {

        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }

  setMainPhoto(photoId: number)
  {
    return this.http.put(this.baseUrl + "user/set-main-photo/" +  photoId, {});
  }


  deletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }

  addLike(username: string)
  {
    return this.http.post(this.baseUrl + "likes/" + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {

    let params = getPaginationHeaders(pageNumber, pageSize);
    
    params = params.append('predicate', predicate);

    

    return getPaginatedResult<Member[]>(this.baseUrl + "likes", params, this.http);
   // return this.http.get<Member[]>(this.baseUrl + "likes?predicate=" + predicate, {})
  }

  //getHttpOptions() {
  //  const UserString = localStorage.getItem('user');
  //  if (!UserString) return; // This line will return undefined if UserString is falsy
  //  const user = JSON.parse(UserString);
  //  return { // Corrected the placement of the curly brace to ensure the object is properly returned
  //    headers: new HttpHeaders({
  //      Authorization: 'Bearer ' + user.token
  //    })
  //  }; // Added a semicolon to end the object declaration
  //}



// Get all member old method without filterration
  //getMembers() {
  //  if (this.members.length > 0) return of(this.members);

  //  return this.http.get<Member[]>(this.baseUrl + 'user').pipe(
  //    map(members => {

  //      this.members = members;
  //      return members;
  //    })
  //  );
  //}

  //old page system
  //private getPaginationResult<T>(url: string, params: HttpParams) {

  //  const paginateResult: PaginatedResult<T> = new PaginatedResult<T>;

  //  return this.http.get<T>(url, { observe: 'response', params }).pipe(
  //          map(response => {
  //            if (response.body) {
  //              paginateResult.result = response.body;
  //              }
  //              //After worls do a console log
  //              const pagination = response.headers.get('Pagination');
  //              if (pagination) {
  //                 paginateResult.pagination = JSON.parse(pagination);
  //              }
  //              return paginateResult;
  //          })
  //      );
  //  }

    //private getPaginationHeaders(pageNumber: number, pageSize: number) {
  //      let params = new HttpParams();


  //  params = params.append('pageNumber', pageNumber);
  //  params = params.append('pageSize', pageSize);

  //      return params;
  //  }
}

