
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  //users: any;


  constructor() { }

    ngOnInit(): void {
     // this.getUsers();
    }

  registerToggle()
  {
    this.registerMode = !this.registerMode;
  }

  //getUsers()
  //{
  //  this.http.get("http://localhost:5000/api/user").subscribe({
  //    next: response => this.users = response,
  //    error: error => console.log(error),
  //    complete: () => console.log("Request is Completed")
  //  })
  //}

  cancleRegisterMode(event: boolean)
  {
    this.registerMode = event;
  }

}
