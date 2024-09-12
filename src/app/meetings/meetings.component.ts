import { Component, Input } from '@angular/core';
import { MeetingDto } from '../openapi';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [ AsyncPipe, CommonModule, MatCardModule, MatButtonModule, MatIconModule ],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss',
})
export class MeetingsComponent {
  @Input()
  meetings!: MeetingDto[];

  constructor() {}

}
