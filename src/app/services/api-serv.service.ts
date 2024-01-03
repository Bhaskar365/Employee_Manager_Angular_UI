import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateEmp, Department } from '../empModules/employee-components/models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiServService {

  constructor(private http:HttpClient) { }

  ////// WEB-API LOGIN-SIGNUP FUNCTION STARTS /////////

  authBaseUrl = "https://localhost:7275/api/Login/";

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
      Pwd: loginData[1]
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

  ///Employee API 
  APIUrl= "https://localhost:7275/api/Employee";
  APIUrlById= "https://localhost:7275/api/Employee";
  APICreate = "https://localhost:7275/api/Employee/Create";
  updateAPI = "https://localhost:7275/api/Employee";

  getAllEmployees(){
    return this.http.get(this.APIUrl + '/employees').pipe(catchError((err)=>{
      return err;
    }));
  }

  getEmployeeById(id:any){
    return this.http.get(`${this.APIUrlById}/${id}`);
  }

  createNewEmployee(form:CreateEmp){
    console.log('create form')
    debugger;
    return this.http.post(this.APICreate,form).pipe(catchError((err)=>{
      debugger;
      console.log("error : ",err)
      return err;
    }));
  }

  updateEmployees(id:any,data:any) : Observable<Object>{
    const url = `${this.updateAPI}/${id}`;
    return this.http.put(url,data);
  }

  deleteEmployeeById(id:any){
      return this.http.delete(`${this.APIUrl}/${id}`);
  }

  ////Department API
  getAllDeptAPI = "https://localhost:7275/api/Departments";
  addDeptAPI = "https://localhost:7275/api/Departments/NewDepartment";
  getDeptByIDAPI = "https://localhost:7275/api/Departments/id";

  //get all department details
  getAllDepartments() {
    return this.http.get<any>(this.getAllDeptAPI + "/allDepartments").pipe(catchError((err:any)=>{
      return err;
    }));
  }

  //get department by ID
  getDepartmentById(id:number) {
    return this.http.get<any>(`this.getDeptByIDAPI/${id}`).pipe(catchError((err)=>{
      return err;
    }));
  }

  addNewDepartment(dep:Department) {
    return this.http.post(this.addDeptAPI,dep).pipe(catchError((err)=>{
      return err;
    }));
  }

 /////////// WEB-API CRUD FUNCTION ENDS ///////////

}
