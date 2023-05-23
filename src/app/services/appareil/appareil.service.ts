import { Injectable } from '@angular/core';
import { AppareilStatus, IAppareil } from '../../models/appareil.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  appareilSubject = new Subject<IAppareil[]>()
  private appareils: IAppareil[] = []
  private firebasePath = "https://http-client-demo-afd69-default-rtdb.europe-west1.firebasedatabase.app/appareils.json"
  constructor(private httpClient: HttpClient) { }
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
  saveAppareilsToServer = () => {
    this.httpClient.put<IAppareil>(this.firebasePath, this.appareils)
      .subscribe(
        {
          next: (value) => {
            console.log("Enregistrement terminé !")
          },
          error: (error) => {
            console.log("Erreur lors de l'enregistrement !" + error)
          }
        }
      )
  }
  getAppareilsFromServer = () => {
    this.httpClient.get<IAppareil[]>(this.firebasePath).subscribe(
      {
        next: (response) => {
          this.appareils = response
          this.emitAppareilSubject()
        },
        error: (error) => {
          console.log("Erreur de chargement: " + error)
        }
      }
    )
  }
}
