import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserDto, UserService } from '../openapi';
import { rePasswordValidator } from '../repassword.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
        Validators.required,
        Validators.minLength(8),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { asyncValidators: rePasswordValidator() }
  );

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private apiService: UserService
  ) {}

  rejoindre() {
    if (this.form.valid) {
      const user: CreateUserDto = <CreateUserDto>this.form.value;
      this.apiService.userControllerCreate(user).subscribe({
        next: (user) => this.router.navigate(['connection']),
        error: (error) =>
          this._snackBar.open('Echec de la creation', 'Fermer', {
            duration: 3000,
          }),
      });
    } else {
      this._snackBar.open('Données invalides', 'Fermer', {
        duration: 3000,
      });
    }
  }
}
