import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  LoggedUser,
  User,
  UserWithoutPassword,
} from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = this.istokenValid;
  isAuth$ = new Subject<boolean>();
  constructor(private router: Router) {}
  get istokenValid() {
    const tokenStringfy = localStorage.getItem('firstAngularAppUser');
    if (tokenStringfy) {
      const parsedToken: LoggedUser = JSON.parse(tokenStringfy);
      if (parsedToken.tokenExp > Date.now()) return true;
    }
    return false;
  }

  emitAuthValue = () => {
    this.isAuth$.next(this.isAuth);
  };

  signIn = (user: UserWithoutPassword): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loggedUser: LoggedUser = {
          ...user,
          // token duration is 15 minutes
          tokenExp: Date.now() + 60 * 1000 * 15,
        };
        localStorage.setItem('firstAngularAppUser', JSON.stringify(loggedUser));
        this.isAuth = true;
        this.emitAuthValue();
        resolve(true);
        this.router.navigate(['appareils']);
      }, 2000);
    });
  };

  signOut = () => {
    localStorage.setItem('firstAngularAppUser', JSON.stringify({}));
    this.isAuth = false;
    this.emitAuthValue();
    this.router.navigate(['sign-in']);
  };
}
