import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { MeetingsComponent } from '../meetings/meetings.component';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { CreateMeetingDto, MeetingDto, MeetingService } from '../openapi';
import { MatButtonModule } from '@angular/material/button';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TopbarComponent,
    CalendarComponent,
    MeetingsComponent,
    MeetingFormComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  meetings: MeetingDto[] = [];

  mode: 'add' | 'edit' | 'calendar' = 'calendar';
  cursor: number = -1;

  _meeting?: MeetingDto;

  constructor(private meetingService: MeetingService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.meetingService.meetingsControllerFindAll().subscribe({
      next: (meetings) => (this.meetings = meetings),
      error: (error) => console.log('error', error),
    });
  }

  edit(i: number) {
    this._meeting = structuredClone(this.meetings[i]);
    this.mode = 'edit';
  }

  add() {
    this._meeting = {};
    this.mode = 'add';
  }

  save(meeting: MeetingDto) {
    switch (this.mode) {
      case 'add':
        this.meetingService
          .meetingControllerCreate(<CreateMeetingDto>meeting)
          .subscribe({
            next: (data) => this.reset(),
            error: (error) => console.log('error', error),
          });
        break;
      case 'edit':
        if (meeting.id) {
          this.meetingService
            .meetingControllerUpdate(meeting.id, meeting)
            .subscribe({
              next: (data) => this.reset(),
              error: (error) => console.log('error', error),
            });
        }
        break;
      default:
        break;
    }
  }

  reset() {
    delete this._meeting;
    this.init();
    this.mode = 'calendar';
  }
}
