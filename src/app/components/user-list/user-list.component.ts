import { UserService } from './../../services/user/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  /*  users: User[]
  userSubscription: Subscription */

  constructor(private userService: UserService) {
    /*    this.users = []
    this.userSubscription = new Subscription() */
  }

  ngOnInit(): void {
    /*     this.userSubscription = this.userService.usersSubject.subscribe(
      {
        next: (users) => {
          this.users = users
        },
      }
    )
    this.userService.emitUserSubject() */
  }
  ngOnDestroy(): void {
    /* this.userSubscription.unsubscribe() */
  }
}
