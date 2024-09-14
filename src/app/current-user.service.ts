import { inject, Injectable, signal } from '@angular/core';
import { UserDto, UserService } from './openapi';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  userApi = inject(UserService);
  token = inject(TokenService);
  user = signal<UserDto | null>(null);

  constructor() {
    this.refresh();
  }

  refresh() {
    this.userApi.userControllerFind().subscribe({
      next: (user) => this.user.set(user),
      error: (error) => {
        this.user.set(null);
        this.token.removeAccessToken();
      }
    })
  }
}
