import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateMeetingDto, MeetingService } from '../openapi';

@Component({
  selector: 'app-new-meeting',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './new-meeting.component.html',
  styleUrl: './new-meeting.component.scss'
})
export class NewMeetingComponent {
  form: FormGroup = new FormGroup(
    {
      date: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
    }
  );

  constructor(
    private _snackBar: MatSnackBar,
    private meetingService: MeetingService,
  ) {}

  creer() {
    if (this.form.valid) {
      const meeting: CreateMeetingDto = <CreateMeetingDto>this.form.value;
      this.meetingService.meetingControllerCreate(meeting).subscribe({
        next: (meeting) => {},
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
