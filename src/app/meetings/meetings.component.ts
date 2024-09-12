import { Component } from '@angular/core';
import { MeetingDto, MeetingService } from '../openapi';
import { Observable, tap } from 'rxjs';
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
    console.log(this.meetingService.configuration);
    this.meetings$ = this.meetingService.meetingsControllerFindAll().pipe(
      tap((o) => {
        console.log(o);
      })
    );
  }
}
