// Navigation shell for the entire the app
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakPointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      // Used to subscribe to the observable multiple times
      shareReplay()
    );

  // With this we can check in the code for our chosen breakpoints when the screen is resized
  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
