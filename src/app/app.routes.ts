/**
 * Created by Mtui on 9/18/16.
 */

import { Routes } from "@angular/router";
import { AppComponent } from "./app-component";
import { MakeView } from "./views/DeviceAttributesView";
import {EntryView} from "./views/EntryView";
import {DeviceDetailsView} from "./views/DeviceDetailsView";
import {GetPriceView} from "./views/GetPriceView"
import {DeviceListView} from "./views/DeviceListView";
import {MainView} from "./views/MainView";
import {MacDetailsView} from "./views/MacDetailsView";
import {MacMainView} from "./views/MacMainView";

export const appRoutes: Routes = [
    { path: '', component: EntryView },
    { path: 'calculator/macbook', component: EntryView },
    { path: 'maclist', component: MacDetailsView },
    { path: 'mac-main', component: MacMainView},
    { path: 'calculator', component: EntryView },
    { path: 'macs', component: EntryView },
    { path: "make", component: MakeView},
    { path: "device-details", component: DeviceDetailsView, data: {s: "", x: ""}},
    { path: "final-price", component: GetPriceView, data: {s: "", x: ""}},
    { path: "device-list", component: DeviceListView}
];

export const appRoutingProviders: any[] = [];
