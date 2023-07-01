import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AppareilService } from '../../services/appareil/appareil.service';
import { Component, OnInit } from '@angular/core';
import { AppareilStatus } from 'src/app/models/appareil.model';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss'],
})
export class SingleAppareilComponent implements OnInit {
  name: string = 'Appareil';
  status: AppareilStatus = AppareilStatus.OFF;
  id: number = 0;
  constructor(
    private appareilService: AppareilService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const appareil = this.appareilService.getAppareilById(+id);
    if (appareil) {
      this.name = appareil.name;
      this.status = appareil.status;
      this.id = appareil.id;
    } else this.router.navigate(['/appareils']);
  }
}
