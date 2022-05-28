import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private service: UserService, private router: Router) { }

  canActivate() {
    if(this.service.getToken()===null ||this.service.getToken()===undefined) {
      return true;
    }else{
      this.router.navigate(["/list"]);
      return false;
    }
  }
  
}
