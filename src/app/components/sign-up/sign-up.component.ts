import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, mergeMap, of } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  newUserForm: FormGroup;
  newUserSubscription: Subscription;
  existingUserMsg: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.newUserForm = new FormGroup({});
    this.newUserSubscription = new Subscription();
    this.existingUserMsg =
      'Un utilisateur avec email déjà existe sur la Base des données';
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngOnDestroy(): void {
    this.newUserSubscription.unsubscribe();
  }
  initForm = () => {
    this.newUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['female', Validators.required],
    });
  };
  onSubmitForm = () => {
    const formValue: User = this.newUserForm.value;
    this.newUserSubscription = this.userService
      .getOneUser(formValue['email'])
      .pipe(
        mergeMap((exisitingUser) => {
          if (Object.keys(exisitingUser).length)
            return of(this.existingUserMsg);
          return this.userService.addOneUser({
            firstName: formValue['firstName'],
            lastName: formValue['lastName'],
            email: formValue['email'],
            password: formValue['password'],
            gender: formValue['gender'],
          });
        })
      )
      .subscribe({
        next: (v) => {
          if (v !== this.existingUserMsg) {
            console.log('Enregistrement du nouvelle utilisateur terminé !');
            this.router.navigate(['/sign-in']);
          } else console.log('Cet utilisateur existe dèjà !');
        },
        error: (error) => {
          console.error(
            "Erreur lors de l'enregistrement du nouveau utilisateur !" + error
          );
        },
      });
  };
}
