import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../../services/appareil/appareil.service';
import { IAppareil } from 'src/app/models/appareil.model';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {
  isAuth = false;
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date()
    setTimeout(() => {
      resolve(date)
    }, 2000)

  })
  appareilsSubscription: Subscription;
  appareils: IAppareil[];
  constructor(private appareilService: AppareilService) {
    this.appareilsSubscription = new Subscription()
    this.appareils = []
    setTimeout(() => {
      this.isAuth = true
    }, 4000);
  }
  ngOnInit(): void {
    this.onFetch()
    this.appareilsSubscription = this.appareilService.appareilSubject.subscribe(
      {
        next: (appareils) => {
          this.appareils = appareils
        }
      }
    )
    this.appareilService.emitAppareilSubject()
  }
  ngOnDestroy(): void {
    this.appareilsSubscription.unsubscribe()
  }
  onSwitchOnAll = () => {
    this.appareilService.switchOnAll()
  }
  onSwitchOffAll = () => {
    this.appareilService.switchOffAll()
  }
  onSave = () => {
    this.appareilService.saveAppareilsToServer()
  }
  onFetch = () => {
    this.appareilService.getAppareilsFromServer()
  }
}
