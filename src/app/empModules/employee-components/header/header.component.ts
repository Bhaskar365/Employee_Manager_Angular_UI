import { Component , EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServService } from 'src/app/services/api-serv.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  }

  logOut(){
    this.api.removeToken();
  }

  goHome(){
    
  }

}
