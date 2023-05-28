import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonPremierComponent } from './components/mon-premier/mon-premier.component';
import { AppareilComponent } from './components/appareil/appareil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil/appareil.service';
import { AppareilViewComponent } from './components/appareil-view/appareil-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SingleAppareilComponent } from './components/single-appareil/single-appareil.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';

import { EditAppareilComponent } from './components/edit-appareil/edit-appareil.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user/user.service';
import { NewUserComponent } from './components/new-user/new-user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authGuard } from './guard/auth/auth.guard';
import { notAuthGuard } from './guard/not-auth/not-auth.guard';

const appRoutes: Routes = [
  {
    path: 'appareils',
    canActivate: [authGuard],
    component: AppareilViewComponent,
  },
  {
    path: 'appareils/:id',
    canActivate: [authGuard],
    component: SingleAppareilComponent,
  },
  {
    path: 'edit',
    canActivate: [authGuard],
    component: EditAppareilComponent,
  },
  {
    path: 'sign-up',
    canActivate: [notAuthGuard],
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    canActivate: [notAuthGuard],
    component: SignInComponent,
  },
  { path: 'users', canActivate: [authGuard], component: UserListComponent },
  {
    path: 'new-user',
    canActivate: [authGuard],
    component: NewUserComponent,
  },
  {
    path: 'users/:id',
    canActivate: [authGuard],
    component: UserListComponent,
  },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AppareilComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent,
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AppareilService, AuthService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
