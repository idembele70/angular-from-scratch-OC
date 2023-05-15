import { Component, Input } from '@angular/core';
import { IAppareil } from '../models/appareil.model';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent {
  @Input() appareil: IAppareil = {
    name: "",
    status: ""
  }

  /**
   * getStatus
   */
  public getStatus() {
    return this.appareil.status
  }
  public getColor() {
    return this.appareil.status === 'éteint' ? 'red' : 'green'
  }
  getListOffStatus = () => {
    return this.appareil.status === 'éteint'
  }
  getListOnStatus = () => {
    return this.appareil.status === 'allumé'
  }
}
