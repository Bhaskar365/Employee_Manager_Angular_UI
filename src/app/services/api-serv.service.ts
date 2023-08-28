import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateEmp } from '../empModules/employee-components/models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiServService {

  constructor(private http:HttpClient) { }

  ////// WEB-API LOGIN-SIGNUP FUNCTION STARTS /////////

  authBaseUrl = "https://localhost:7289/api/Login/";

  currentUser:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  jwtService = new JwtHelperService();

  createAccount(user:Array<String|null|undefined>) {

      return this.http.post(this.authBaseUrl + 'Create',
      {
            Name:user[0],
            Email:user[1],
            Pwd:user[2],
      },
        { responseType: 'text' }
      );
  }

  loginInfo(loginData:any) 
  {
    return this.http.post(this.authBaseUrl + 'LoginEmployee',{
      Email: loginData[0],
      Password: loginData[1]
    },
    { responseType: 'text' }
    );
  }

  setToken(token:string) {
    localStorage.setItem('access_token',token);
    this.loadLoggedCurrentUser();
  }

  loadLoggedCurrentUser() {
    const token = localStorage.getItem('access_token');
    const userInfo = token != null ? this.jwtService.decodeToken(token):null;

    let data  = userInfo ? {
      UserId : userInfo.UserId,
      Name : userInfo.Name,
      Email : userInfo.Email
    } : null
    this.currentUser.next(data);
  }

  isLogged():boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  removeToken() {
    console.log('remove token done');
    localStorage.removeItem('access_token');
  }

  /////////// WEB-API LOGIN-SIGNUP FUNCTION ENDS ///////////


    /////////// WEB-API CRUD FUNCTION STARTS ///////////


  APIUrl= "https://localhost:7289/api/Employee";
  APIUrlById= "https://localhost:7289/api/Employee";
  APICreate = "https://localhost:7289/api/Employee/Create";
  updateAPI = "https://localhost:7289/api/Employee";

  getAllEmployees(){
    return this.http.get(this.APIUrl + '/GetAll').pipe(catchError((err)=>{
      return err;
    }));
  }

  getEmployeeById(id:any){
    return this.http.get(`${this.APIUrlById}/${id}`);
  }

  createNewEmployee(form:CreateEmp){
    return this.http.post(this.APICreate,form);
  }

  updateEmployees(id:any,data:any) : Observable<Object>{
    const url = `${this.updateAPI}/${id}`;
    return this.http.put(url,data);
  }

  deleteEmployeeById(id:any){
      return this.http.delete(`${this.APIUrl}/${id}`);
  }
  
 /////////// WEB-API CRUD FUNCTION ENDS ///////////

}
