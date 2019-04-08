import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'pts-counter';
  constructor(router: Router ) {
    const navEnds = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    navEnds.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-131388209-2', {
        'page_path': event.urlAfterRedirects
      });
    })
  }
}
