import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UrlInjectionGuard implements CanActivate {
  constructor(private service: UserService, private router: Router) { }

  canActivate() {
    if (this.service.getToken() === null || this.service.getToken() === undefined) {
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }
  
}
