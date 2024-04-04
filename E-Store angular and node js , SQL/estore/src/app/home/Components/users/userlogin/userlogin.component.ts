import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/home/services/user.service';
import { loginToken } from 'src/app/home/types/users.type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  userLoginForm: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';

  constructor(private fb: FormBuilder , private userService: UserService , private location: Location) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void { 

    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next: (result: loginToken) => {
        result.user.email = this.email?.value;
        this.userService.activateToken(result , this.email?.value);
        this.alertType = 0;
        this.alertMessage = 'Login successful';
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      error: (error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;
      },
    });
  }

 }

  

