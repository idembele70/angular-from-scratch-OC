import { AppareilService } from './../services/appareil/appareil.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilStatus } from '../models/appareil.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent {
  defaultOnOff: AppareilStatus
  constructor(private appareilService: AppareilService,
    private router: Router
  ) {
    this.defaultOnOff = AppareilStatus.OFF
  }
  onSubmit = (formData: NgForm) => {
    const name = formData.value["name"] as string
    const status = formData.value["status"] as AppareilStatus
    this.appareilService.addAppareil({
      status, name, id: Date.now()
    })
    this.router.navigate(["/appareils"])
  }
}
