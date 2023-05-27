import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  /* private users: User[] = [
    {
      firstName: 'toto',
      lastName: 'totoName',
      drinkPreference: 'coca',
      email: 'toto@mail.com',
      hobbies: ['football', 'basketball', 'hockey'],
    },
    {
      firstName: 'titi',
      lastName: 'titiName',
      drinkPreference: 'pepsi',
      email: 'titi@mail.com',
      hobbies: [],
    },
  ]; */
  usersSubject = new Subject<User[]>();
  private firebasePath =
    'https://http-client-demo-afd69-default-rtdb.europe-west1.firebasedatabase.app/users.json';
  constructor(private httpClient: HttpClient) {}

  emitUserSubject = () => {
    this.usersSubject.next(this.users.slice());
  };
  getOneUser = (email: string) => {
    return this.httpClient.get<User>(
      `${this.firebasePath}?orderBy="email"&equalTo="${email}"`
    );
  };
  addOneUser = (newUser: User) => {
    return this.httpClient.post(`${this.firebasePath}`, newUser);
  };
}
