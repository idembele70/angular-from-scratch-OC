import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoggedUser } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenStringfy = localStorage.getItem('firstAngularAppUser');
  if (tokenStringfy) {
    const parsedToken: LoggedUser = JSON.parse(tokenStringfy);
    if (parsedToken.tokenExp > Date.now()) {
      router.navigate(['appareils']);
      return false;
    }
  }
  return true;
};
