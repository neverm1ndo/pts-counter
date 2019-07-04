import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'pts-counter';
  constructor(
    router: Router,
    private meta: Meta
   ) {

     this.meta.addTag({ name: 'robots', content: 'index' });
     this.meta.addTag({ name: 'description', content: 'Профессиональный буст рейтинга DOTA 2, прокачка аккаунтов, прохождение BattlePass и многое другое. А также ламповые стримы!' });
     this.meta.addTag({ name: 'keywords', content: 'DOTA, boost, rating, mmr, рейтинг, буст' });
     this.meta.addTag({ name: 'content-type', content: 'text/html;charset=utf-8' });
     this.meta.addTag({ name: 'copyright', content: 'neverm1nd & teenie. & necessaryevil' });

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
