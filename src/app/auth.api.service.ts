import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  url = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private cookie: CookieService) {}

  connecter(form: any) {
    return this.http
      .post<Token>(this.url, form)
      .pipe(tap((token: Token) => this.setToken(token)));
  }

  profile() {
    return this.http.get(this.url + '/profile', {
      headers: this.tokenHeader(),
    });
  }

  setToken(token: Token) {
    this.cookie.set('defi-photo', token.access_token);
  }

  getToken(): string {
    return this.cookie.get('defi-photo');
  }

  deleteToken() {
    this.cookie.delete('defi-photo');
  }

  tokenExists(): boolean {
    return this.getToken() != null && this.getToken().length > 0;
  }

  tokenHeader() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}
