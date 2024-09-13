import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { MeetingDto } from '../openapi';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  ],
  templateUrl: './meeting-form.component.html',
  styleUrl: './meeting-form.component.scss',
})
export class MeetingFormComponent {
  @Input()
  set meeting(meeting: MeetingDto) {
    if (meeting && meeting.date) {
      this._meeting = meeting;
      let date = new Date(meeting.date);
      this.form.reset({
        date: date,
        time: this.getTimeFromDate(date),
        location: meeting.location,
      });
    } else {
      this.form.reset();
    }
  }
  _meeting!: MeetingDto;

  date = model<Date | null>(null);

  @Output()
  saved = new EventEmitter<MeetingDto>();

  form: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  save() {
    if (this.form.valid) {
      this._meeting.date = this.getDateFromStrings(
        this.form.value.date,
        this.form.value.time
      ).toISOString();
      this._meeting.location = this.form.value.location;
      this.saved.emit(this._meeting);
    }
  }

  getTimeFromDate(date: Date): string {
    let h = String(date.getHours()).padStart(2, '0');
    let m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  getDateFromStrings(date: string, time: string) {
    let d = new Date(date);
    let t = time.split(':');
    d.setHours(+t[0]);
    d.setMinutes(+t[1]);
    return d;
  }
}
