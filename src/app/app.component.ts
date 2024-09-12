import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from './auth.api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'defi-photo';

  constructor(private authApiService: AuthApiService, private router: Router) {}

  ngOnInit() {
    if (!this.authApiService.tokenExists()) {
      this.router.navigate(['enter']);
    } else {
      this.authApiService.profile().subscribe({
        error: (error) => {
          this.authApiService.deleteToken();
          this.router.navigate(['enter']);
        },
      });
    }
  }
}
