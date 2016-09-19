/**
 * Created by Mtui on 9/18/16.
 */

import { Component } from '@angular/core';
import { TopNav } from './nav.js';
import { MainView } from './main-view.js';

@Component ({
    selector: 'entry',
    template: '<topnav></topnav><main-view></main-view><footer></footer>'
})

export class Entry{}