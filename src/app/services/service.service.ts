import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CreateEmp } from '../components/models/models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  APIUrl= "https://localhost:7212/api/Employee";
  APIUrlById= "https://localhost:7212/api/Employee";
  APICreate = "https://localhost:7212/api/Employee/Create";
  updateAPI = "https://localhost:7212/api/Employee";

  constructor(private http:HttpClient) { }

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


  // addEmployees(data:any):Observable<any>
  // {
  //   return this.http.post("http://localhost:3000/UsersValues",data);
  // }

  // getEmployees():Observable<any>{
  //   return this.http.get('http://localhost:3000/UsersValues');
  // }

  // deleteEmployees(id:number):Observable<any>{
  //   return this.http.delete(`http://localhost:3000/UsersValues/${id}`);
  // }

  // viewEmployee(id:number){
  //   return this.http.post(`http://localhost:3000/UsersValues/`,id);
  // }

 

}
