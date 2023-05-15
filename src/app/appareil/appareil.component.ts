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
}
