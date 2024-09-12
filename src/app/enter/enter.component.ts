import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enter',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './enter.component.html',
  styleUrl: './enter.component.scss',
})
export class EnterComponent {}
