import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from './auth.api.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, Configuration, UserService } from './openapi';
import { TopbarComponent } from './topbar/topbar.component';
import { userSignal } from '../main';
import { CurrentUserService } from './current-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'conseil-de-cycle';

  constructor(
    private router: Router,
    private auth: AuthService,
    private authApiService: AuthApiService,
    private currentUserService: CurrentUserService,
  ) {}

  ngOnInit() {
    const token = this.authApiService.getAccessToken();

    if (!token) {
      this.router.navigate(['enter']);
    } else {
      this.auth.authControllerGetProfile().subscribe({
        next: () => this.currentUserService.setUser(),
        error: (error) => {
          this.authApiService.removeAccessToken();
          this.router.navigate(['enter']);
        },
      });
    }
  }
}
