import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of} from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  //currentUser$: Observable<User | null> = of(null);

  // logginIn = false
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //   this.currentUser$ = this.accountService.currentUser$;
   // this.currentUser$ = this.accountService.currentUser$;
  }

   

  Login() {
    this.accountService.Login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        this.model = {};
        console.log("Login Res ", response);
       
      },
      error: error => this.toastr.error(error.error)
    })
    //console.log("Login ", this.model);
  }

  //remove a iitem in local storage and delee gio to register page agian after logout
  LogOut() {

    this.accountService.logout();
    this.router.navigateByUrl('/'); // register page

  }
}
