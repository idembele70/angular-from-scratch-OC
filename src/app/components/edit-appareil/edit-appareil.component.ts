import { AppareilService } from '../../services/appareil/appareil.service';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilStatus, IAppareil } from '../../models/appareil.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subscription,
  forkJoin,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss'],
})
export class EditAppareilComponent implements OnDestroy {
  defaultOnOff: AppareilStatus;
  newAppareilSubscription: Subscription;
  existingAppareilMsg: string;
  constructor(
    private appareilService: AppareilService,
    private router: Router
  ) {
    this.defaultOnOff = AppareilStatus.OFF;
    this.newAppareilSubscription = new Subscription();
    this.existingAppareilMsg = 'Cette appareil existe sur la Base des données';
  }
  onSubmit = (formData: NgForm) => {
    const name = formData.value['name'] as string;
    const status = formData.value['status'] as AppareilStatus;
    const newAppareil: IAppareil = {
      status,
      name,
      id: Date.now(),
    };
    this.newAppareilSubscription = this.appareilService
      .getOneAppareilFromServer({ name })
      .pipe(
        mergeMap((existingAppareil) => {
          if (Object.keys(existingAppareil).length === 0) {
            return this.appareilService.saveOneAppareilToServer(newAppareil);
          }
          return of(this.existingAppareilMsg);
        })
      )
      .subscribe({
        next: (v) => {
          if (v !== this.existingAppareilMsg) {
            console.log('Enregistrement du nouvelle appareil terminer !');
            this.router.navigate(['/appareils']);
          } else console.log('Cette appareil existe dèjà !');
        },
        error: (error) => {
          console.log("Erreur lors de l'enregistrement !" + error);
        },
      });
  };
  ngOnDestroy(): void {
    this.newAppareilSubscription.unsubscribe();
  }
}
