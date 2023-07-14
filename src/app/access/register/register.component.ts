import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiServService } from 'src/app/services/api-serv.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  successMsg:boolean = true;
  failMsg:boolean = true;
  responseMsg: string = '';
  spinnerLoading: boolean = true;

  constructor(private router: Router, private api: ApiServService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({

      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get Name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Pwd(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  getNameErrorMessage() {
    return this.registerForm.controls?.['name'].hasError('required') ? 'Enter Name' : '';
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls?.['email'].hasError('required')) {
      return 'Enter Email';
    }

    return this.registerForm.controls?.['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.registerForm.controls?.['password'].hasError('required') ? 'Enter Password' : '';
  }

  registerFormSubmit() {
    console.log(this.registerForm.value);
    this.api.createAccount([
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    ]).subscribe(res => {
      console.log(res);
      if (res == "Success") {
        this.responseMsg = 'Account Created Successfully!';
        this.successMsg = false;
        this.spinnerLoading = true;
        setTimeout(() => {
          this.spinnerLoading = false;
          this.router.navigate(["/login"]);
        }, 1500);
      } else if (res == 'Already Exists') {
        this.responseMsg = 'Account Already Exist.';
        this.failMsg = false;
        this.spinnerLoading = true;
        setTimeout(() => {
          this.spinnerLoading = false;
          window.location.reload();
        }, 1500);
      } else {
        this.responseMsg = 'Something went wrong';
        this.failMsg = false;
        console.log(this.responseMsg);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

}
