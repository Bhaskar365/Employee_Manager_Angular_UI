import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './services/service.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveServService implements Resolve<any>{

  constructor(private serv:ServiceService) { }

  resolve(router:ActivatedRouteSnapshot):Observable<any> | boolean| Promise<any>{
    return this.serv.getEmployees();
  }
   
}

