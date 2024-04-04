import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';


  constructor( private accountService: AccountService) { }

  ngOnInit(): void {
 
    this.SetCurrentUser(); 
  }


  SetCurrentUser()
  {
    // two logic for session thinsg logic 
    //const UserString = localStorage.getItem('user');
    //if (!UserString) return;
    //const user: User = JSON.parse(UserString);


    const user: User = JSON.parse(localStorage.getItem('user')!);  //! not null

    this.accountService.setCurrentUser(user);
  }
}
