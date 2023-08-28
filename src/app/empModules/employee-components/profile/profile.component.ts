import { Component, OnInit } from '@angular/core';
import { ApiServService } from 'src/app/services/api-serv.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  x:any;

  constructor(private api:ApiServService){}

  jwtHelperService = new JwtHelperService();

  ngOnInit(){

    let token = localStorage.getItem('access_token');
    let userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;
    let data = userInfo;
    this.x = data;
    console.log(this.x);

  }

}
