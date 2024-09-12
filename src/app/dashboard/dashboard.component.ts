import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { MeetingsComponent } from "../meetings/meetings.component";
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { CreateMeetingDto, MeetingDto, MeetingService } from '../openapi';
import { MatButtonModule } from '@angular/material/button';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent, MeetingsComponent, MeetingFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  meetings: MeetingDto[] = [];

  mode: 'add' | 'edit' | 'calendar' = 'calendar';
  cursor: number = -1;

  _meeting!: MeetingDto;

  constructor(private meetingService: MeetingService) {}

  ngOnInit() {
    this.meetingService.meetingsControllerFindAll().subscribe({
      next: (meetings) => {
        for (let i = 1; i < 24; i++) {
          console.log(i);
          const date = new Date();
          date.setDate(date.getDate() + i);
          date.setHours(i);
          this.meetings.push({
            id: i,
            date: date.toISOString(),
            location: 'ICI',
          });
        }
       }
    });
  }

  edit(i: number) {
    this.mode = 'edit';
    this._meeting = this.meetings[i];
  }

  add() {
    this.mode = 'add';
    this._meeting = {};
  }

  save(meeting: MeetingDto) {
    switch (this.mode) {
      case 'add':
        this.meetingService.meetingControllerCreate(<CreateMeetingDto>meeting);
        break;
      case 'edit':
        if (meeting.id) {
          this.meetingService.meetingControllerUpdate(meeting.id, meeting);
        }
        break;
      default:
        break;
    }
  }

}
