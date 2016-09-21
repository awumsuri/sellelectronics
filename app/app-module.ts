import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app-component.js";
import { TopNav } from "./views/Nav.js";
import { MainView } from "./views/MainView.js";
import { Footer } from "./views/Footer.js";
import { appRoutingProviders } from "./app.routes.js";
import { Entry } from "./views/Entry.js";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes.js";
import { MakeView } from "./views/DeviceAttributes.js";
import { History } from "./views/History.js"
import { DeviceService } from "./services/DeviceService.js";
import { HttpModule} from "@angular/http"
import {UserDevice} from "./model/UserDevice.js";
import {ResponsiveModule, ResponsiveConfig, ResponsiveConfigInterface} from "ng2-responsive";

let config: ResponsiveConfigInterface = {
    breakPoints: {
        xs: {max: 600},
        sm: {min: 601, max: 959},
        md: {min: 960, max: 1279},
        lg: {min: 1280, max: 1919},
        xl: {min: 1920}
    },
    debounceTime: 100 // allow to debounce checking timer
};

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        ResponsiveModule
    ],
    declarations: [
        AppComponent,
        TopNav,
        MainView,
        Footer,
        Entry,
        MakeView,
        History
    ],
    providers:[
        appRoutingProviders,
        DeviceService,
        UserDevice
    ],
    bootstrap: [AppComponent]
})

export  class AppModule{
    constructor(private _deviceService: DeviceService,
                private _userDevice: UserDevice){

    }
}
