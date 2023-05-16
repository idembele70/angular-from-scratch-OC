import { AuthService } from './../auth/auth.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService) { }

}

export const AuthGuard: CanActivateFn =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean => {
    const authService = inject(AuthService)
    if (authService.isAuth)
      return true
    else
      inject(Router).navigate(["/auth"])
    return false
  }
