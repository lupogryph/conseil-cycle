import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Invite } from './rejoindre/invite.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InviteApiService {
  url = environment.apiUrl + '/invite';

  constructor(private http: HttpClient, private cookie: CookieService) {}

  rejoindre(invite: Invite) {
    return this.http.post(this.url, invite);
  }
}
