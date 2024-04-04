import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  //model: any = {}
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;
  passwordFieldType: string = 'password';


  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }



  initializeForm()
  {
    //this name , passwords string is called in register html in fromControlName
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      KnownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]

    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
      })
  }

  //custom match value wih=th a password
  matchValues(matchTo: string): ValidatorFn
  {
    return (control: AbstractControl) => {
      return control.value == control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = { ...this.registerForm.value, dateOfBirth: dob };
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members')
      },
      error: error => {
        this.validationErrors = error
      }
    })
  }

  togglePasswordVisibility(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.passwordFieldType = isChecked ? 'text' : 'password';
  }
  //register() {

  //  // console.log(this.registerForm?.value);
  //  const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
  //  const values = { ...this.registerForm.value, dateOfBirth: dob };
  // // this.accountService.register(this.registerForm.value)
  //  this.accountService.register(values).subscribe({
  //    next:() =>
  //    {
  //      this.router.navigateByUrl('/members')
  //     // this.cancel();
  //    },
  //    error: err =>
  //    {
  //      this.validationErrors = err
  //    }
  //    })
   
  //}

  cancel() {
    this.cancelRegister.emit(false);
  
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}
