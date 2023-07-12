import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiServService {

  constructor(private http:HttpClient) { }

  ////WEB-API FUNCTION ///////

  baseUrl = "https://localhost:7208/api/Login";

  currentUser:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  jwtService = new JwtHelperService();

  createAccount(user:Array<String|null|undefined>) {

  }



}
