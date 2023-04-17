import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http:HttpClient) { }

  getValues(){
    return this.http.get(this.baseUrl);
  }

  getData(id:any){
    return this.http.get("https://jsonplaceholder.typicode.com/users/" + id);
  }


}
