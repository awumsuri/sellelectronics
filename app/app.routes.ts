/**
 * Created by Mtui on 9/18/16.
 */

import { Routes } from "@angular/router";
import { AppComponent } from "./app-component";
import { MakeView } from "./views/DeviceAttributes";
import { Entry } from "./views/Entry";
import {DeviceDetails} from "./views/DeviceDetails";
import { GetPrice } from "./views/GetPrice"

export const appRoutes: Routes = [
    { path: '', component: Entry },
    { path: "make", component: MakeView},
    { path: "device-details", component: DeviceDetails, data: {s: "", x: ""}},
    { path: "final-price", component: GetPrice, data: {s: "", x: ""}}
];

export const appRoutingProviders: any[] = [];
