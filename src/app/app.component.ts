import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from './auth.api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'conseil-de-cycle';

  constructor(private router: Router, private authApiService: AuthApiService) {}

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
