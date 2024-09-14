import { Component, computed, input, signal } from '@angular/core';
import { MeetingDto } from '../openapi';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

interface Calendar {
  day: number;
  month: number;
  events?: MeetingDto[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatGridListModule,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  meetings = input<MeetingDto[]>([]);

  month = signal(new Date().getMonth());

  year = signal(new Date().getFullYear());

  firstDayDate = computed(() => new Date(this.year(), this.month(), 1));

  empty = computed(() => {
    let p = Number(new DatePipe('fr-FR').transform(this.firstDayDate(), 'c'));
    return p == 0 ? 6 : --p;
  });

  maxDay = computed(() => new Date(this.year(), this.month() + 1, 0).getDate());

  constructor() {}

  getMeetings(day: number): MeetingDto[] {
    return this.meetings().filter((m) =>
      m.date
        ? new Date(m.date)
            .toLocaleDateString()
            .startsWith(
              `${String(day).padStart(2, '0')}/${new DatePipe(
                'fr-FR'
              ).transform(this.firstDayDate(), 'MM/yyyy')}`
            )
        : false
    );
  }

  nextMonth() {
    if (this.month() < 11) {
      this.month.set(this.month() + 1);
    } else {
      this.month.set(0);
      this.year.set(this.year() + 1);
    }
  }

  previousMonth() {
    if (this.month() > 0) {
      this.month.set(this.month() - 1);
    } else {
      this.month.set(12);
      this.year.set(this.year() - 1);
    }
  }

  currentDay(i: number) {
    let a = new Date(this.year(), this.month(), i + 1);
    let b = new Date();
    b.setHours(0, 0, 0, 0);
    return a.getTime() == b.getTime();
  }

  _add() {}

  _edit() {}
}
