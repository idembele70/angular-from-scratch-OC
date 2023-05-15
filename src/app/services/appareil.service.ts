import { Injectable } from '@angular/core';
import { AppareilStatus, IAppareil } from '../models/appareil.model';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  appareils: IAppareil[] = [
    {
      id: 0,
      name: 'Machine à laver',
      status: AppareilStatus.ON
    }, {
      id: 1,
      name: "Televions",
      status: AppareilStatus.OFF
    }, {
      id: 2,
      name: "Ordinateur",
      status: AppareilStatus.ON
    }
  ]
  switchOnAll = () => {
    for (const appareil of this.appareils) {
      appareil.status = AppareilStatus.ON
    }
  }

  switchOffAll = () => {
    for (const appareil of this.appareils) {
      appareil.status = AppareilStatus.OFF
    }
  }

  switchOn = (id: number) => {
    this.appareils[id].status = AppareilStatus.ON
  }
  switchOff = (id: number) => {
    this.appareils[id].status = AppareilStatus.OFF
  }

  constructor() { }
}
