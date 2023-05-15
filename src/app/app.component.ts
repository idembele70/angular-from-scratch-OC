import { Component, OnInit } from '@angular/core';
import { IAppareil } from './models/appareil.model';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = false;
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date()
    setTimeout(() => {
      resolve(date)
    }, 2000)

  })
  appareils: IAppareil[];
  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true
    }, 4000);
    this.appareils = []
  }
  ngOnInit(): void {
    this.appareils = this.appareilService.appareils
  }
  onSwitchOnAll = () => {
    this.appareilService.switchOnAll()
  }
  onSwitchOffAll = () => {
    this.appareilService.switchOffAll()
  }
}
