import { inject, Injectable } from '@angular/core';
import { UserDto, UserService } from './openapi';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  userApi = inject(UserService);
  user = toSignal<UserDto | null>(this.userApi.userControllerFind());
}
