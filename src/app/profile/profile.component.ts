import { Component, effect, input } from '@angular/core';
import { UpdateUserDto, UserService } from '../openapi';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { rePasswordValidator } from '../repassword.directive';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { userSignal } from '../../main';
import { CurrentUserService } from '../current-user.service';
import { FilterEmptyPipe } from '../filter-empty.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatCardModule,
    JsonPipe,
    FilterEmptyPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = userSignal;

  profile = input(this.user());

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]{2,}'),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]{2,}'),
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
      ]),
      rePassword: new FormControl('', [
        Validators.minLength(8),
      ]),
    },
    { asyncValidators: rePasswordValidator() }
  );

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private currentUserService: CurrentUserService,
  ) {
    effect(() => {
      console.log(this.profile());
      this.form.reset(this.profile());
    });
  }

  _save() {
    if (this.user()?.role != 'admin') {
      this._snackBar.open(`Option désactivée`, 'Fermer', {
        duration: 5000,
      });
      return;
    }
    if (this.form.valid) {
      let update = <UpdateUserDto>this.form.value;
      update = new FilterEmptyPipe().transform(update);
      this.userService.userControllerUpdate(<UpdateUserDto>this.form.value).subscribe({
        next: (result) => {
          this.currentUserService.setUser();
          this._snackBar.open(`Utilisateur modifié`, 'Fermer', {
            duration: 5000,
          });
        },
        error: (error) => {
          this._snackBar.open(`Echec de la modification : ${error.error.message}`, 'Fermer', {
            duration: 10000,
            panelClass: ['red-snackbar'],
          });
        },
      })
    }
  }

}
