import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EnterComponent } from './enter/enter.component';
import { MeetingsComponent } from './meetings/meetings.component';

export const routes: Routes = [
  { path: 'enter', component: EnterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: '', redirectTo: 'meetings', pathMatch: 'full' },
];
