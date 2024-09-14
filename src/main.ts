import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { signal, WritableSignal } from '@angular/core';

export const token: WritableSignal<string | null> = signal(null);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
