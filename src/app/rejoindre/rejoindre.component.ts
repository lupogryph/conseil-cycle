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
import { InviteApiService } from '../invite.api.service';
import { Invite } from './invite.dto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejoindre',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './rejoindre.component.html',
  styleUrl: './rejoindre.component.scss',
})
export class RejoindreComponent {
  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    nom: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z]{2,}'),
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z]{2,}'),
    ]),
    pin: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{4,}'),
    ]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private inviteApiService: InviteApiService,
    private router: Router
  ) {}

  rejoindre() {
    console.log(this.form.valid);
    if (this.form.valid) {
      const invite: Invite = <Invite>this.form.value;
      console.log(invite);
      this.inviteApiService.rejoindre(invite).subscribe({
        next: (invite) => this.router.navigate(['connection']),
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
