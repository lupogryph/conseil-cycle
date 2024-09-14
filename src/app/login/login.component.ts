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
import { Auth, AuthService } from '../openapi';
import { AuthApiService } from '../auth.api.service';
import { environment } from '../../environments/environment';

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

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private authApiService: AuthApiService,
  ) {}

  connecter() {
    if (this.form.valid) {
      const auth: Auth = <Auth>this.form.value;
      auth.email = environment.defaultUser;
      this.authService.authControllerConnecter(auth).subscribe({
        next: (token) => {
          this.authApiService.setAccessToken(token.access_token);
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
