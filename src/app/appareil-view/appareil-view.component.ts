import { Component } from '@angular/core';
import { AppareilService } from '../services/appareil/appareil.service';
import { IAppareil } from '../models/appareil.model';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent {
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
