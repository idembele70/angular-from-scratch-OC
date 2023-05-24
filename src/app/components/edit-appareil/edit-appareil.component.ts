import { AppareilService } from '../../services/appareil/appareil.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilStatus } from '../../models/appareil.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss'],
})
export class EditAppareilComponent {
  defaultOnOff: AppareilStatus;
  constructor(
    private appareilService: AppareilService,
    private router: Router
  ) {
    this.defaultOnOff = AppareilStatus.OFF;
  }
  onSubmit = async (formData: NgForm) => {
    const name = formData.value['name'] as string;
    const status = formData.value['status'] as AppareilStatus;
    const existingAppareil =
      await this.appareilService.getOneAppareilFromServer({
        name,
      });
    if (!Object.keys(existingAppareil).length) {
      this.appareilService.saveOneAppareilToServer({
        status,
        name,
        id: Date.now(),
      });
      this.router.navigate(['/appareils']);
    }
  };
}
