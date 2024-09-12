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
import { AuthApiService } from '../auth.api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss',
})
export class ConnectionComponent {
  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    pin: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private authApiService: AuthApiService,
    private router: Router
  ) {}

  connecter() {
    if (this.form.valid) {
      this.authApiService.connecter(this.form.value).subscribe({
        next: (token) => this.router.navigate(['defi']),
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
