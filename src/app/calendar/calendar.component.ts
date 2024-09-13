import { Component, Input } from '@angular/core';
import { MeetingDto } from '../openapi';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';

interface Calendar {
  day: number;
  month: number;
  events?: MeetingDto[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatGridListModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input()
  meetings!: MeetingDto[];

  calendar: Calendar[] = [];

  constructor() {
    for (let i = 1; i <= 31; i++) {
      this.calendar.push({
        day: i,
        month: 11,
        events: [],
      });
    }
    this.calendar[10].events = [
      {
        id: 1,
        date: '2024-11-11T11:11:00.000Z',
        location: 'Chatenois',
      },
    ];
  }
}
