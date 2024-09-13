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
import { Auth, AuthService, Configuration, UserService } from '../openapi';
import { AuthApiService } from '../auth.api.service';
import { CurrentUserService } from '../current-user.service';
import { userSignal } from '../../main';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userSignal = userSignal;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private authApiService: AuthApiService,
    private currentUserService: CurrentUserService,
  ) {}

  connecter() {
    if (this.form.valid) {
      const auth: Auth = <Auth>this.form.value;
      this.authService.authControllerConnecter(auth).subscribe({
        next: (token) => {
          //this.authService.configuration.credentials = { Bearer: token.access_token };
          this.authApiService.setAccessToken(token.access_token);
          this.currentUserService.setUser();
          this.router.navigate(['']);
        },
        error: (error) => {
          this._snackBar.open(`Echec de la connection : ${error.error.message}`, 'Fermer', {
            duration: 10000,
            panelClass: ['red-snackbar'],
          });
        },
      });
    } else {
      this._snackBar.open('Identifiant invalide', 'Fermer', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }
  }
}
