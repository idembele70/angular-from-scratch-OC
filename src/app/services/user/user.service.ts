import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      firstName: "toto",
      lastName: "totoName",
      drinkPreference: 'coca',
      email: "toto@mail.com",
      hobbies: ["football", "basketball", "hockey"]
    },
    {
      firstName: "titi",
      lastName: "titiName",
      drinkPreference: 'pepsi',
      email: "titi@mail.com",
      hobbies: []
    },
  ]
  usersSubject = new Subject<User[]>()
  constructor() { }

  emitUserSubject = () => {
    this.usersSubject.next(this.users.slice())
  }
  addUser = (user: User) => {
    this.users.push(user)
    this.emitUserSubject()
  }
}
