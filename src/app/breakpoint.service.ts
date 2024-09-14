import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private _breakpointSubscription: Subscription[] = [];

  isMobile: boolean = false;
  isTablet: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {

    this._breakpointSubscription.push(this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait, Breakpoints.Small, Breakpoints.XSmall
    ]).subscribe( bp => {
      if (bp.matches) {
        this.isMobile = true;
        this.isTablet = false;
      }
    }));

    this._breakpointSubscription.push(this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape, Breakpoints.Medium, Breakpoints.TabletPortrait
    ]).subscribe( bp => {
      if (bp.matches) {
        this.isMobile = true;
        this.isTablet = true;
      }
    }));

    this._breakpointSubscription.push(this.breakpointObserver.observe([
      Breakpoints.TabletLandscape
    ]).subscribe( bp => {
      if (bp.matches) {
        this.isMobile = false;
        this.isTablet = true;
      }
    }));

    this._breakpointSubscription.push(this.breakpointObserver.observe([
      Breakpoints.Large, Breakpoints.XLarge
    ]).subscribe( bp => {
      if (bp.matches) {
        this.isMobile = false;
        this.isTablet = false;
      }
    }));

  }

  close() {
    this._breakpointSubscription.forEach(s => s.unsubscribe());
  }

}
