import { Component, Input } from '@angular/core';
import { AppareilStatus, IAppareil } from '../../models/appareil.model';
import { AppareilService } from '../../services/appareil/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent {
  @Input() appareil: IAppareil = {
    id: 0,
    name: "",
    status: AppareilStatus.OFF
  }
  /**
   * getStatus
   */
  public getStatus() {
    return this.appareil.status
  }
  public getColor() {
    return this.appareil.status === AppareilStatus.OFF ? 'red' : 'green'
  }
  getListOffStatus = () => {
    return this.appareil.status === AppareilStatus.OFF
  }
  getListOnStatus = () => {

    return this.appareil.status === AppareilStatus.ON
  }
  constructor(private appareilService: AppareilService) {

  }
  onSwitchOnOne = () => {
    this.appareilService.switchOn(this.appareil.id)
  }
  onSwitchOffOne = () => {
    this.appareilService.switchOff(this.appareil.id)
  }
}
