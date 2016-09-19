/**
 * Created by Mtui on 9/18/16.
 */

import { Routes } from "@angular/router";
import { SelectionPage } from "./views/selection-view.js"
import {AppComponent} from "./app-component.js";
import {MakeView} from "./views/make.js";
import {Entry} from "./views/entry.js";

export const appRoutes: Routes = [
    { path: '', component: Entry },
    { path: "make", component: MakeView}
];

export const appRoutingProviders: any[] = [];


