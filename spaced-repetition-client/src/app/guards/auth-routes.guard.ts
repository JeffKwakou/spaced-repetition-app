import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoutesGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['folders'])
      return false
    }
    return true;
  }
  
}
