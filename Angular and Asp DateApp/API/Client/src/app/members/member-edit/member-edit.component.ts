import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty)
    {
      $event.returnValue = true;
    }
  }
 
  member: Member | undefined;
  user: User | null = null;

  constructor(private accountService: AccountService, private memberService: MembersService
    , private toastr: ToastrService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe({

      next: user => this.user = user
      })
  }


  ngOnInit(): void {
    this.loadMember();
    }

  loadMember()
  {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: mem => this.member = mem
      })
  }

  updateForm()
  {
    this.memberService.UpdateMember(this.editForm?.value).subscribe({

      next: _ =>
      {
   
        this.toastr.success("Profile Update Successfully");
        this.editForm?.reset(this.member);
      }
      })

  
  }

}
