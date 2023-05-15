import { Component } from '@angular/core';
import { IAppareil } from './models/appareil.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth = false;

  appareils: IAppareil[] = [
    {
      name: 'Machine à laver',
      status: "allumer "
    }, {
      name: "Televions",
      status: "éteint"
    }, {
      name: "Ordinateur",
      status: "éteint"
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
