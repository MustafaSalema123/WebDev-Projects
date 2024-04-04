import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from 'src/app/models/login-request-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model:LoginRequest;

  constructor(private authService: AuthService , private cookieService:CookieService , public router:Router){
    this.model = {
      email: '',
      password:''
    }
  }
  onFormSubmit(){

    this,this.authService.login(this.model).subscribe({
      next: (response) => {
        //Set Auth Cookie
        this.cookieService.set('Authorization', 'Bearer ${response.token}',undefined,'/',
        undefined,true, 'Strict');
        
        console.log(response);

        this.authService.setUser({
          email: response.email,
          roles: response.roles,
        });


        //Rediret back to home page
        this.router.navigateByUrl("");
      }
    })

    //console.log(this.model);
  }
}
