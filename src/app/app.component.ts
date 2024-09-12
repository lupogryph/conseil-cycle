import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from './auth.api.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, Configuration } from './openapi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'conseil-de-cycle';

  constructor(
    private router: Router,
    private auth: AuthService,
    private authApiService: AuthApiService
  ) {}

  ngOnInit() {
    const token = this.authApiService.getAccessToken();

    if (!token) {
      this.router.navigate(['enter']);
    } else {
      this.auth.authControllerGetProfile().subscribe({
        error: (error) => {
          this.authApiService.removeAccessToken();
          this.router.navigate(['enter']);
        },
      });
    }
  }
}
