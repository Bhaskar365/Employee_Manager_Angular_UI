import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // baseUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http:HttpClient) { }

  // getValues(){
  //   return this.http.get(this.baseUrl);
  // }

  // getData(id:any){
  //   return this.http.get("https://jsonplaceholder.typicode.com/users/" + id);
  // }

  addEmployees(data:any):Observable<any>
  {
    return this.http.post("http://localhost:3000/UsersValues",data);
  }

  updateEmployees(data:any,id:number):Observable<any>
  {
    return this.http.put(`http://localhost:3000/UsersValues/${id}`,data);
  }

  getEmployees():Observable<any>{
    return this.http.get('http://localhost:3000/UsersValues');
  }

  deleteEmployees(id:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/UsersValues/${id}`);
  }

  viewEmployee(id:number){
    return this.http.post(`http://localhost:3000/UsersValues/`,id);
  }

 

}
