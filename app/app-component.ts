import { Component } from '@angular/core';
import { TopNav } from './views/Nav.js';
import { MainView } from './views/MainView.js';
import { Entry } from './views/Entry.js';


@Component ({
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent{}