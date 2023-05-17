import { AuthService } from './services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, interval, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;
  constructor() {
    this.secondes = 0
    this.counterSubscription = new Subscription()
  }
  ngOnInit(): void {
    const counter = interval(1000);
    const counterSubscription = counter.subscribe({
      next: (value) => {
        this.secondes = value
      },
      error: (error) => {
        console.log("Une erreur à été rencontrée !")
      }
    })
  }
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe()
  }
}
