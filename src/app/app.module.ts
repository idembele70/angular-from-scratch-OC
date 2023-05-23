import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonPremierComponent } from './components/mon-premier/mon-premier.component';
import { AppareilComponent } from './components/appareil/appareil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil/appareil.service';
import { AuthComponent } from './components/auth/auth.component';
import { AppareilViewComponent } from './components/appareil-view/appareil-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SingleAppareilComponent } from './components/single-appareil/single-appareil.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { AuthGuardService, AuthGuard } from './services/auth-guard/auth-guard.service';
import { EditAppareilComponent } from './components/edit-appareil/edit-appareil.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user/user.service';
import { NewUserComponent } from './components/new-user/new-user.component';

const appRoutes: Routes = [
  { path: "", canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: "appareils", canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: "appareils/:id", canActivate: [AuthGuard], component: SingleAppareilComponent },
  { path: "edit", canActivate: [AuthGuard], component: EditAppareilComponent },
  { path: "auth", component: AuthComponent },
  { path: "users", component: UserListComponent },
  { path: "new-user", component: NewUserComponent },
  { path: "users/:id", canActivate: [AuthGuard], component: UserListComponent },
  { path: "not-found", component: FourOhFourComponent },
  { path: "**", redirectTo: "/not-found" },
]

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
