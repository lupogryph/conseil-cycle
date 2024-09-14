import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { signal, WritableSignal } from '@angular/core';

export const auth: WritableSignal<boolean> = signal(false);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
