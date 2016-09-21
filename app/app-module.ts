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

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule
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
