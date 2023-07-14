import { Injectable } from '@angular/core';
import { ApiServService } from '../services/api-serv.service';
import { ActivatedRouteSnapshot , CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api: ApiServService) { }

  canActivate( route: ActivatedRouteSnapshot,
               state : RouterStateSnapshot):
               Observable<boolean|UrlTree> |
               Promise<boolean|UrlTree> |
               boolean |
               UrlTree 
  { 
        return this.api.isLogged();
        // return true;
  }

}