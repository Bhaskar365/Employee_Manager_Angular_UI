import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { ApiServService } from 'src/app/services/api-serv.service';
import { debounceTime, delay } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  responseMsg: any = '';
  successMsg:boolean = true;
  failMsg:boolean = true;
  reloadingMsg:string = '';
  spinnerLoading:boolean = true;;

  constructor(private router:Router,private api:ApiServService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  getEmailErrorMessage(){
    if (this.loginForm.controls?.['email'].hasError('required')) {
      return 'Enter Email';
    }

    return this.loginForm.controls?.['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(){
    return this.loginForm.controls?.['password'].hasError('required') ? 'Enter Password' : '';
  }

  loginFormSubmit()
  {
    this.api.loginInfo([
      this.loginForm.value.email,
      this.loginForm.value.password
    ]
    ).subscribe((res:any) => {
      console.log(res);
      this.failMsg = true; 
      if(res == 'Failure') 
      {
        this.responseMsg = 'Wrong Credentials. Refreshing Page';
        this.failMsg = false; 
        console.log(this.responseMsg);
        this.spinnerLoading = true;
        setTimeout(()=>{
            this.spinnerLoading = false;
            window.location.reload();
        },1500);
      }
      else {
        this.responseMsg = 'Login Successful';
        this.successMsg = true; 
        this.api.setToken(res);
        this.successMsg = false; 
        console.log(this.responseMsg);
        this.spinnerLoading = true;
        setTimeout(()=>{
          this.spinnerLoading = false;
          this.router.navigateByUrl('employee/employee-home');
        },1500); 
      }
    });  
  }

  moveToRegister(){
    this.router.navigateByUrl('/register');
  }
}

