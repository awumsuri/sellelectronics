/**
 * Created by Mtui on 9/18/16.
 */

import { Routes } from "@angular/router";
import { AppComponent } from "./app-component.js";
import { MakeView } from "./views/DeviceAttributes.js";
import { Entry } from "./views/Entry.js";

export const appRoutes: Routes = [
    { path: '', component: Entry },
    { path: "make", component: MakeView}
];

export const appRoutingProviders: any[] = [];
