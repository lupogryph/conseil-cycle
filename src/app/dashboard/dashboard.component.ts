import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { MeetingsComponent } from "../meetings/meetings.component";
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MeetingDto, MeetingService } from '../openapi';
import { MatButtonModule } from '@angular/material/button';
import { NewMeetingComponent } from "../new-meeting/new-meeting.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent, MeetingsComponent, NewMeetingComponent, MatIconModule, MatButtonModule, NewMeetingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  meetings: MeetingDto[] = [];

  constructor(private meetingService: MeetingService) {}

  ngOnInit() {
    this.meetingService.meetingsControllerFindAll().subscribe({
      next: (meetings) => {
        this.meetings = meetings;
        for (let i = 0; i < 10; i++) {
          this.meetings.push({
            id: i,
            date: new Date().toLocaleDateString(),
            location: 'ICI',
            createdBy: {
              email: '',
              firstName: '',
              name: '',
              role: 'user'
            },
            updatedBy: {
              email: '',
              firstName: '',
              name: '',
              role: 'user'
            }
          });
        }
       }
    });
  }

}
