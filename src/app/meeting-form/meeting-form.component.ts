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
import { MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { JsonPipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-meeting-form',
  standalone: true,
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
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
    this._meeting = meeting;
    if (meeting && meeting.date) {
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

  @Output()
  saved = new EventEmitter<MeetingDto>();

  @Output()
  cancel = new EventEmitter();

  form: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{2}:[0-9]{2}'),
    ]),
    location: new FormControl('', [Validators.required]),
  });

  _save() {
    if (this.form.valid) {
      let d = this.form.value.date;
      let t = this.form.value.time.split(':');
      d.setHours(+t[0]);
      d.setMinutes(+t[1]);
      this._meeting.date = d.toISOString();
      this._meeting.location = this.form.value.location;
      this.saved.emit(this._meeting);
    }
  }

  _cancel() {
    this.cancel.emit();
  }

  getTimeFromDate(date: Date): string {
    let h = String(date.getHours()).padStart(2, '0');
    let m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}
