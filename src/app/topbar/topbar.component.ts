import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthApiService } from '../auth.api.service';
import { UserDto, UserService } from '../openapi';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  user?: UserDto;

  constructor(private userService: UserService) {
    userService.userControllerFind().subscribe({
      next: (user) => (this.user = user),
    });
  }
}
