import { Component } from '@angular/core';
import { TopNav } from './views/Nav';
import { MainView } from './views/MainView';
import { Entry } from './views/Entry';


@Component ({
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent{}