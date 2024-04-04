import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder  , AbstractControl, Validators } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from 'src/app/home/services/user.service';
import { user } from 'src/app/home/types/users.type';

//frombuiler = provide method to reduce the boiler plate code to crete from
//fromGroup = Collection of from controls and field that keep track of thier values and validation

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
  //providers:[UserService]
})
export class UserSignupComponent implements OnInit{

  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error



  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      firstName: ['',  Validators.required],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
      email: ['' ,[Validators.required , Validators.email]],
      password: ['',Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      Validators:matchPasswords
    }
    );

  }
  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }


  onSubmit(): void {
    
    const user: user = {
      firstName: this.firstName?.value,
      lastName: this.userSignupForm.get('lastName')?.value,
      address: this.userSignupForm.get('address')?.value,
      city: this.userSignupForm.get('city')?.value,
      state: this.userSignupForm.get('state')?.value,
      pin: this.userSignupForm.get('pin')?.value,
      email: this.userSignupForm.get('email')?.value,
      password: this.userSignupForm.get('password')?.value,
    };
  
    this.userService.createUser(user).subscribe({
      next: (result) => {
        
        if (result.message === 'success') {
          this.alertMessage = 'User created successfully';
          this.alertType = 0;
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: (error) => {
        this.alertMessage = error.message;
        this.alertType = 2;
      },
    });
  }
}


