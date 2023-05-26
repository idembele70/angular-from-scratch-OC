import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../../services/appareil/appareil.service';
import { IAppareil, ToggleStatus } from 'src/app/models/appareil.model';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss'],
})
export class AppareilViewComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  lastUpdate: Promise<Date>;
  appareilsSubscription: Subscription;
  appareils: IAppareil[];
  constructor(private appareilService: AppareilService) {
    this.isAuth = false;
    this.lastUpdate = new Promise((resolve) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, 2000);
    });
    this.appareilsSubscription = new Subscription();
    this.appareils = [];
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }
  ngOnInit(): void {
    this.appareilService.getAllAppareilFromServer();
    this.appareilsSubscription = this.appareilService.appareilSubject.subscribe(
      {
        next: (appareils) => {
          this.appareils = appareils;
        },
      }
    );
    this.appareilService.emitAppareilSubject();
  }
  ngOnDestroy(): void {
    this.appareilsSubscription.unsubscribe();
  }
  onToggleAllStatus = (status: ToggleStatus) => {
    switch (status) {
      case 'ON':
        this.appareilService.switchOnAll();
        break;
      case 'OFF':
        this.appareilService.switchOffAll();
        break;
      default:
        console.error("Le status fournis n'existe pas.");
        break;
    }
    this.appareilService.saveAllAppareilToServer();
  };
}
