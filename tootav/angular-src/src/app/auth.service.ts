import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    // Check whether the token is expired and return
    // true or false
    if (this.jwtHelper.isTokenExpired(token) === true) {
      return false;
    } else {
      if (admin === '1') {
        return true;
      } else {
        return false;
      }
    }
  }
}
