import { Component , EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServService } from 'src/app/services/api-serv.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  x:any;
  @Output() menuClicked = new EventEmitter<boolean>();
  showFiller = false;

  constructor(public api:ApiServService, private router:Router){}

  jwtHelperService = new JwtHelperService();

  ngOnInit(){

    let token = localStorage.getItem('access_token');
    let userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;
    let data =  userInfo;
    this.x = data;
    this.x = data.name.split(' ').slice(0,1).join(' ');
    // console.log(this.x.name.split(' ').slice(0,1).join(' '));
  }

  logOut() 
  {
    this.api.removeToken();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 900,
      timerProgressBar: true,
    })
    Toast.fire({
      icon: 'success',
      title: 'Signed out successfully'
    });
    setTimeout(()=>{
      this.router.navigateByUrl('/login');
    },1000);
    
  }

  goHome() {
    this.router.navigateByUrl('employee/employee-home');
  }

  goToProfile(){
    this.router.navigateByUrl('employee/user-profile');
  }

}
