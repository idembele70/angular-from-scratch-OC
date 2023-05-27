import { AuthService } from './../auth/auth.service';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthService) {}
}

export const AuthGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth) return true;
  router.navigate(['/sign-in']);
  return false;
};

/*
 */
