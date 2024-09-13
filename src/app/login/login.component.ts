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
import { Auth, AuthService, Configuration } from '../openapi';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from '../auth.api.service';
import { UserGlobalService } from '../user-global.service';

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
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private authApiService: AuthApiService,
    private userGlobalService: UserGlobalService
  ) {}

  connecter() {
    if (this.form.valid) {
      const auth: Auth = <Auth>this.form.value;
      this.authService.authControllerConnecter(auth).subscribe({
        next: (token) => {
          //this.authService.configuration.credentials = { Bearer: token.access_token };
          this.authApiService.setAccessToken(token.access_token);
          this.userGlobalService.refreshUser();
          this.router.navigate(['']);
        },
        error: (error) => {
          this._snackBar.open('Echec de la connection', 'Fermer', {
            duration: 3000,
          });
        },
      });
    } else {
      this._snackBar.open('Identifiant invalide', 'Fermer', {
        duration: 3000,
      });
    }
  }
}
