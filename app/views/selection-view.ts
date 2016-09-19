/**
 * Created by Mtui on 9/18/16.
 */
import { Component } from "@angular/core";
import { TopNav } from "./nav.js";

@Component({
    selector: "selection-view",
    template: `<router-outlet name="selectionaux"><topnav></topnav><h2></h2></router-outlet>`
})

export class SelectionPage{}