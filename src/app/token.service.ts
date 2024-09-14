import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  cookie = inject(CookieService);

  constructor() {}

  public setAccessToken(token: string) {
    this.cookie.set(TOKEN, token);
  }

  public getAccessToken(): string {
    return this.cookie.get(TOKEN);
  }

  public removeAccessToken() {
    this.cookie.delete(TOKEN);
  }
}
