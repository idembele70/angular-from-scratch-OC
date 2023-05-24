import { Injectable } from '@angular/core';
import { AppareilStatus, IAppareil } from '../../models/appareil.model';
import { Subject, first, firstValueFrom, map, take } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    this.httpClient
      .post<IAppareil>(`${this.firebasePath}.json`, appareil, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (value) => {
          console.log('Enregistrement du nouvelle appareil terminer !');
          this.emitAppareilSubject();
        },
        error: (error) => {
          console.log("Erreur lors de l'enregistrement !" + error);
        },
      });
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

  getOneAppareilFromServer = async ({
    name,
    id,
    status,
  }: Partial<IAppareil>) => {
    const queryParams: string[] = [];
    if (name !== undefined)
      queryParams.push(`orderBy="name"&equalTo="${name}"`);
    if (id !== undefined) queryParams.push(`orderBy='id'&equalTo='${id}'`);

    if (status !== undefined)
      queryParams.push(`orderBy='status'&equalTo='${status}'`);

    if (!queryParams.length)
      return "Je n'ai trouvé aucun appareil sur la base de données.";
    const existingAppareil$ = this.httpClient.get<IAppareil>(
      `${this.firebasePath}.json?${queryParams.join('&')}`
    );
    return await firstValueFrom(existingAppareil$);
  };
  //error: (error) => console.log('erreur lors de la recherche', error),
}
