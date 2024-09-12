import { Component } from '@angular/core';
import { MeetingDto, MeetingService } from '../openapi';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss',
})
export class MeetingsComponent {
  meetings$: Observable<MeetingDto[]> = new Observable();

  constructor(private meetingService: MeetingService) {}

  ngOnInit() {
    this.meetings$ = this.meetingService.meetingsControllerFindAll();
  }
}
