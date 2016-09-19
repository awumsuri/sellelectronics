import { Component } from '@angular/core';
import { TopNav } from './views/nav.js';
import { MainView } from './views/main-view.js';
import { Entry } from './views/entry.js';


@Component ({
  selector: 'app',
  template: '<entry><router-outlet></router-outlet></entry>'

})

export class AppComponent{

}