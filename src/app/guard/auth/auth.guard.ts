import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoggedUser } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenStringfy = localStorage.getItem('firstAngularAppUser');
  if (tokenStringfy) {
    const parsedToken: LoggedUser = JSON.parse(tokenStringfy);
    if (parsedToken.tokenExp > Date.now()) return true;
  }
  router.navigate(['/sign-in']);
  return false;
};
