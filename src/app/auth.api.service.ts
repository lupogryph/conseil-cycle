import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { auth } from '../main';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  auth = auth;

  constructor(private cookie: CookieService) {}

  public setAccessToken(token: string) {
    this.cookie.set(TOKEN, token);
    this.auth.set(true);
  }

  public getAccessToken(): string {
    return this.cookie.get(TOKEN);
  }

  public removeAccessToken() {
    this.cookie.delete(TOKEN);
    this.auth.set(false);
  }
}
