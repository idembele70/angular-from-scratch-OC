import { Component, Input, OnDestroy } from '@angular/core';
import {
  AppareilStatus,
  IAppareil,
  ToggleStatus,
} from '../../models/appareil.model';
import { AppareilService } from '../../services/appareil/appareil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss'],
})
export class AppareilComponent implements OnDestroy {
  @Input() appareil: IAppareil;
  deletedAppareilSubscription: Subscription;
  updatedAppareilSubscription: Subscription;
  constructor(private appareilService: AppareilService) {
    this.deletedAppareilSubscription = new Subscription();
    this.updatedAppareilSubscription = new Subscription();
    this.appareil = {
      id: 0,
      name: '',
      status: AppareilStatus.OFF,
      firebaseId: '',
    };
  }

  ngOnDestroy(): void {
    this.updatedAppareilSubscription.unsubscribe();
    this.deletedAppareilSubscription.unsubscribe();
  }
  /**
   * getStatus
   */
  public getStatus() {
    return this.appareil.status;
  }
  public getColor() {
    return this.appareil.status === AppareilStatus.OFF ? 'red' : 'green';
  }
  getListOffStatus = () => {
    return this.appareil.status === AppareilStatus.OFF;
  };
  getListOnStatus = () => {
    return this.appareil.status === AppareilStatus.ON;
  };

  toggleAppareilStatus = (status: ToggleStatus) => {
    switch (status) {
      case 'ON':
        this.appareilService.switchOn(this.appareil.id);
        break;
      case 'OFF':
        this.appareilService.switchOff(this.appareil.id);
        break;
      default:
        console.error("Le status fournis n'existe pas.");
        break;
    }
    this.onUpdateAppareil();
  };
  onDeleteOneAppareil = () => {
    if (this.appareil.firebaseId)
      this.deletedAppareilSubscription = this.appareilService
        .deleteOneAppareilFromServer(this.appareil.firebaseId)
        .subscribe({
          next: () => console.log('Appareil Supprimé.'),
          error: (err) => console.error('Erreur lors de la suppression.', err),
        });
  };

  onUpdateAppareil = () => {
    if (this.appareil.firebaseId)
      this.updatedAppareilSubscription = this.appareilService
        .updateOneAppareil(this.appareil.firebaseId, {
          id: this.appareil.id,
          name: this.appareil.name,
          status: this.appareil.status,
        })
        .subscribe({
          next: () => console.log('Appareil mise à jour.'),
          error: (err) => console.error('Erreur lors de la mise à jour.', err),
        });
    else console.log("Le champs 'firebaseId' est undefini.");
  };
}
