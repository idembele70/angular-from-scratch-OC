import { Component } from '@angular/core';
import { IAppareil } from './models/appareil.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth = false;
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date()
    setTimeout(() => {
      resolve(date)
    }, 2000)

  })
  appareils: IAppareil[] = [
    {
      name: 'Machine à laver',
      status: "allumé"
    }, {
      name: "Televions",
      status: "éteint"
    }, {
      name: "Ordinateur",
      status: "allumé"
    }
  ]
  constructor() {
    setTimeout(() => {
      this.isAuth = true
    }, 4000);
  }
  onAllumer = () => {
    console.log("On allume tout !")
  }
}
