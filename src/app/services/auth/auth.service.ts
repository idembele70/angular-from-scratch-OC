import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  constructor() {}
  signIn = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuth = true;
        resolve(true);
      }, 2000);
    });
  };
  signOut = () => {
    this.isAuth = false;
  };
}
