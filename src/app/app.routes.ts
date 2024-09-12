import { Routes } from '@angular/router';
import { RejoindreComponent } from './rejoindre/rejoindre.component';
import { ConnectionComponent } from './connection/connection.component';
import { EnterComponent } from './enter/enter.component';

export const routes: Routes = [
  { path: 'enter', component: EnterComponent },
  { path: 'rejoindre', component: RejoindreComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: '', redirectTo: 'defi', pathMatch: 'full' },
];
