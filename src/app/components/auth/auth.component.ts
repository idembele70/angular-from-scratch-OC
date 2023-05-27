import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authStatus: boolean;
  isSignIn: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.authStatus = authService.isAuth;
    this.isSignIn = false;
  }

  onSignIn = () => {
    this.authService.signIn().then((isAuth) => {
      this.authStatus = isAuth;
      this.router.navigate(['']);
    });
  };
  onSignOut = () => {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  };
  onNavigate = () => {
    this.isSignIn = !this.isSignIn;
  };
  onSubmit = () => {};
}
