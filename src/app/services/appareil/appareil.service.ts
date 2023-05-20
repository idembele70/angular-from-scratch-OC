import { Injectable } from '@angular/core';
import { AppareilStatus, IAppareil } from '../../models/appareil.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  appareilSubject = new Subject<IAppareil[]>()
  private appareils: IAppareil[] = [
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

  emitAppareilSubject = () => {
    this.appareilSubject.next(this.appareils.slice())
  }

  switchOnAll = () => {
    for (const appareil of this.appareils) {
      appareil.status = AppareilStatus.ON
      this.emitAppareilSubject()
    }
  }

  switchOffAll = () => {
    for (const appareil of this.appareils) {
      appareil.status = AppareilStatus.OFF
    }
    this.emitAppareilSubject()
  }

  switchOn = (id: number) => {
    for (let appareil of this.appareils) {
      if (appareil.id === id)
        appareil.status = AppareilStatus.ON
    }
    this.emitAppareilSubject()
  }
  switchOff = (id: number) => {
    for (let appareil of this.appareils) {
      if (appareil.id === id)
        appareil.status = AppareilStatus.OFF
    }
    this.emitAppareilSubject()
  }

  getAppareilById(id: number) {
    return this.appareils.find(
      appareil => appareil.id === id
    )
  }
  addAppareil(newAppareil: IAppareil) {
    this.appareils.push({ ...newAppareil, id: Date.now() })
    this.emitAppareilSubject()
  }
  constructor() { }
}
