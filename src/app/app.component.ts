import { Component } from '@angular/core';
import { AuthApiService } from './auth.api.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from './login/login.component';
import { auth } from '../main';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth = auth;

  constructor(private authApiService: AuthApiService) {}

  ngOnInit() {
    if (this.authApiService.getAccessToken()) {
      auth.set(true);
    }
  }
}
