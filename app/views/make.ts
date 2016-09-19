/**
 * Created by Mtui on 9/18/16.
 */
import { Component } from "@angular/core";
import { TopNav } from "./nav.js";

@Component({
    selector: 'make-view',
    tempale: `<topnav></topnav>
                <span class="heading-pharse">
                    <h2>CHOOSE MAKE</h2>
                </span>
                <div class="downbutton rotate-right history-nav">
                    <img src="/Images/downbutton.jpg"/>                             
                 </div> `
})

export class MakeView{}