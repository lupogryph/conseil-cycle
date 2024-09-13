import { Component, Input } from '@angular/core';
import { MeetingDto } from '../openapi';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Calendar {
  day: number;
  month: number;
  events?: MeetingDto[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatGridListModule, DatePipe, MatIconModule, MatButtonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input()
  meetings!: MeetingDto[];

  @Input()
  month!: number;

  @Input()
  year!: number;

  date!: Date;

  empty: number = 0;

  maxDay: number = 31;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  init() {
    console.log(this.year, this.month);
    let current = new Date();
    this.month ??= current.getMonth();
    this.year ??= current.getFullYear();
    this.date = new Date(this.year, this.month, 1);
    let p = Number(new DatePipe('fr-FR').transform(this.date, 'c'));
    this.empty = p == 0 ? 6 : --p;

    this.maxDay = new Date(this.year, this.month + 1, 0).getDate();
  }

  getMeetings(day: number): MeetingDto[] {
    return this.meetings.filter((m) =>
      m.date
        ? new Date(m.date)
            .toLocaleDateString()
            .startsWith(
              `${String(day).padStart(2, '0')}/${new DatePipe(
                'fr-FR'
              ).transform(this.date, 'MM/yyyy')}`
            )
        : false
    );
  }

  nextMonth() {
    if (this.month < 11) {
      this.month++;
    } else {
      this.month = 0;
      this.year++;
    }
    this.init();
  }

  previousMonth() {
    if (this.month > 0) {
      this.month--;
    } else {
      this.month = 12;
      this.year--;
    }
    this.init();
  }
}
