/**
 * Created by Mtui on 9/18/16.
 */

import { Routes } from "@angular/router";
import { SelectionPage } from "./views/selection-view.js"
import {AppComponent} from "./app-component.js";

export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: "make", component: SelectionPage, outlet: 'selectionaux'}
];

export const appRoutingProviders: any[] = [];


