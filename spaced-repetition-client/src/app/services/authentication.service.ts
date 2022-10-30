import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';

export const JWT_NAME = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService, private jwtHelper: JwtHelperService, private router: Router) { }

  // Store JWT Token in local storage
  login(response: any): void {
    localStorage.setItem(JWT_NAME, response.token)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME)!
    return !this.jwtHelper.isTokenExpired(token)
  }

  logout() {
    localStorage.clear()
  }

  // CUSTOM VALIDATOR
  public controlValuesAreEqual(controlNameA: string[], controlNameB: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valueOfControlA = control.get(controlNameA)?.value
      const valueOfControlB = control.get(controlNameB)?.value

      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        return { valuesDoNotMatch: true }
      }
    }
  }
}
