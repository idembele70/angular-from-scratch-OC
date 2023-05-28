import { Router } from '@angular/router';
import {
  SignInCredentials,
  User,
  UserPartialPassword,
  UserWithoutPassword,
} from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  signInSubscription: Subscription;
  loginStart: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = new FormGroup({});
    this.signInSubscription = new Subscription();
    this.loginStart = false;
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngOnDestroy(): void {
    this.signInSubscription.unsubscribe();
  }
  initForm = () => {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  };
  onSignIn = () => {
    const FormValue: SignInCredentials = this.userForm.value;
    this.loginStart = true;
    this.signInSubscription = this.userService
      .getOneUser(FormValue.email)
      .subscribe({
        next: (user) => {
          if (Object.keys(user).length) {
            const userCredentials: UserPartialPassword = Object.values(user)[0];
            delete userCredentials.password;
            this.authService.signIn(userCredentials);
          }
        },
        error(err) {
          console.error('Erreur lors de la connexion !', err);
        },
      });
    this.loginStart = false;
  };
}
