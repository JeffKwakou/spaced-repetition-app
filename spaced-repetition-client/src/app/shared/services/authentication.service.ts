import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_NAME = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private jwtHelper: JwtHelperService) { }

  // Store JWT Token in local storage
  public login(response: any): void {
    localStorage.setItem(JWT_NAME, response.token);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME)!;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout() {
    localStorage.clear();
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
