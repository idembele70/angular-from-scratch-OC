import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppareilStatus, IAppareil } from '../../models/appareil.model';

@Injectable({
  providedIn: 'root',
})
export class AppareilService {
  appareilSubject = new Subject<IAppareil[]>();
  private appareils: IAppareil[] = [];
  private firebasePath =
    'https://http-client-demo-afd69-default-rtdb.europe-west1.firebasedatabase.app/appareils';

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject = () => {
    this.appareilSubject.next(this.appareils.slice());
  };

  switchOnAll = () => {
    for (const appareil of this.appareils) {
      appareil.status = AppareilStatus.ON;
      this.emitAppareilSubject();
    }
  };

  switchOffAll = () => {
    for (const appareil of this.appareils) {
      appareil.status = AppareilStatus.OFF;
    }
    this.emitAppareilSubject();
  };

  switchOn = (id: number) => {
    for (let appareil of this.appareils) {
      if (appareil.id === id) appareil.status = AppareilStatus.ON;
    }
    this.emitAppareilSubject();
  };

  switchOff = (id: number) => {
    for (let appareil of this.appareils) {
      if (appareil.id === id) appareil.status = AppareilStatus.OFF;
    }
    this.emitAppareilSubject();
  };

  getAppareilById(id: number) {
    return this.appareils.find((appareil) => appareil.id === id);
  }

  saveAllAppareilToServer = () => {
    const appareilToSave: Record<string, IAppareil> = {};
    this.appareils.forEach((appareil) => {
      if (appareil.firebaseId)
        appareilToSave[appareil.firebaseId] = {
          id: appareil.id,
          name: appareil.name,
          status: appareil.status,
        };
    }, {});
    this.httpClient
      .put<IAppareil>(`${this.firebasePath}.json`, appareilToSave, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (value) => {
          console.log('Enregistrement terminé !');
        },
        error: (error) => {
          console.log("Erreur lors de l'enregistrement !" + error);
        },
      });
  };

  saveOneAppareilToServer = (appareil: IAppareil) => {
    return this.httpClient.post<IAppareil>(
      `${this.firebasePath}.json`,
      appareil,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  getAllAppareilFromServer = () => {
    this.httpClient.get<IAppareil[]>(`${this.firebasePath}.json`).subscribe({
      next: (data) => {
        const fireBaseIds = Object.keys(data);
        this.appareils = Object.values(data).map((item, idx) => ({
          ...item,
          firebaseId: fireBaseIds[idx],
        }));
        this.emitAppareilSubject();
      },
      error: (error) => {
        console.log('Erreur de chargement: ' + error);
      },
    });
  };

  getOneAppareilFromServer = ({ name, id }: Partial<IAppareil>) => {
    const queryParams: string[] = [];
    if (name !== undefined)
      queryParams.push(`orderBy="name"&equalTo="${name}"`);
    else if (id !== undefined) queryParams.push(`orderBy='id'&equalTo='${id}'`);
    return this.httpClient.get<IAppareil>(
      `${this.firebasePath}.json?${queryParams.join()}`
    );
  };

  deleteOneAppareilFromServer = (firebaseId: string) => {
    return this.httpClient.delete(`${this.firebasePath}/${firebaseId}.json`);
  };

  updateOneAppareil = (
    firebaseId: string,
    data: Omit<IAppareil, 'firebaseId'>
  ) => {
    return this.httpClient.put(`${this.firebasePath}/${firebaseId}.json`, data);
  };
}
