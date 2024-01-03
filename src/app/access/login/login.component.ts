import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiServService } from 'src/app/services/api-serv.service';
import { debounceTime, delay } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  responseMsg: any = '';
  successMsg: boolean = true;
  failMsg: boolean = true;
  reloadingMsg: string = '';
  spinnerLoading: boolean = true;

  constructor(private router: Router, private api: ApiServService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      Pwd: new FormControl('', [Validators.required])
    })
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls?.['email'].hasError('required')) {
      return 'Enter Email';
    }

    return this.loginForm.controls?.['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls?.['Pwd'].hasError('required') ? 'Enter Password' : '';
  }

  loginFormSubmit() {

    this.spinnerLoading = false;

    this.api.loginInfo([
      this.loginForm.value.email,
      this.loginForm.value.Pwd
    ]
    ).subscribe((res: any) => {
      this.failMsg = true;
        if (res == 'Failure') {
          this.responseMsg = 'Wrong Credentials. Try Again';
          this.failMsg = false;
          console.log(this.responseMsg);
          this.spinnerLoading = true;

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1300,
            timerProgressBar: true,
          })

          Toast.fire({
            icon: 'error',
            title: 'Credentials Incorrect'
          })
        }
        else {
          this.responseMsg = 'Login Successful';
          this.successMsg = true;
          this.api.setToken(res);
          this.successMsg = false;
          console.log(this.responseMsg);
          this.spinnerLoading = true;

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1300,
            timerProgressBar: true,
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })

          setTimeout(() => {
            this.spinnerLoading = false;
            this.router.navigateByUrl('employee/employee-home');
          }, 1500);
        }
      });
  }

  moveToRegister() {
    this.router.navigateByUrl('/register');
  }
}

