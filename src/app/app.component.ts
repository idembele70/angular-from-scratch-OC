import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {
    this.isAuth = false;
    this.authSubscription = new Subscription();
  }
  ngOnInit(): void {
    this.authSubscription = this.authService.isAuth$.subscribe({
      next: (value) => {
        this.isAuth = value;
      },
      error: (err) => {
        console.error("Une Erreur s'est produit lors de la subscription", err);
      },
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  onSignOut = () => {
    this.authService.signOut();
  };
}
