import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from '../../_models/member';
import { Pagination } from '../../_models/pagination';
import { User } from '../../_models/user';
import { UserParams } from '../../_models/userParams';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
 // member$: Observable<Member[]> | undefined;
  members: Member[] = []; //inintial url*/
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [{ value: "male", display: "Males" }, { value: "female", display: "females" }]  
  

  constructor(private memeberService: MembersService) {
    this.userParams = this.memeberService.userParams;
    //this.accountService.currentUser$.pipe(take(1)).subscribe({
    //  next: user =>
    //  {
    //    if (user)
    //    {
    //      this.userParams = new UserParams(user);
    //      this.user = user;
    //    }
    //  }
    //  })

  }

  ngOnInit(): void {
    //this.member$ = this.memeberService.getMembers();
    this.loadMember();
  }

  loadMember() {
    if (this.userParams) {
      this.memeberService.SetUserParams(this.userParams);
      this.memeberService.getMembers(this.userParams).subscribe(
      {
        next: response =>
        {
          if (response.result && response.pagination)
          {
            this.members = response.result;
            this.pagination = response.pagination;

          }
        }

       // next: members => this.members = members
        })
    }
  }

  resetFilters()
  {
    
      this.userParams = this.memeberService.resetUserParams();
      this.loadMember();
    
  }

  pageChanged(event: any)
  {
    if (this.userParams && this.userParams.pageNumber !== event.page)
    {
      this.userParams.pageNumber = event.page;
      this.memeberService.SetUserParams(this.userParams);
      this.loadMember();
    }
  }
}
