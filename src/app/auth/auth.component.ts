import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authStatus: boolean
  constructor(private authService: AuthService, private router: Router) {
    this.authStatus = authService.isAuth
  }

  onSignIn = () => {
    this.authService.signIn().then(
      isAuth => {
        this.router.navigate([""])
        this.authStatus = isAuth
      }
    )
  }
  onSignOut = () => {
    this.authService.signOut()
    this.authStatus = this.authService.isAuth
  }
}
