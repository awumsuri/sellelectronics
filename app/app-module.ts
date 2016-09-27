import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app-component";
import { TopNav } from "./views/Nav";
import { MainView } from "./views/MainView";
import { Footer } from "./views/Footer";
import { appRoutingProviders } from "./app.routes";
import { Entry } from "./views/Entry";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { MakeView } from "./views/DeviceAttributes";
import { History } from "./views/History"
import { DeviceService } from "./services/DeviceService";
import { HttpModule} from "@angular/http"
import {UserDevice} from "./model/UserDevice";
import {ResponsiveModule, ResponsiveConfigInterface} from "ng2-responsive";
import {HasDeviceType} from "./utils/HasDeviceTypesPipe";
import {DeviceTypes} from "./model/DeviceTypes"
import {DeviceDetails} from "./views/DeviceDetails";
import {ResizableModule} from "angular2-resizable";
import {GetPrice} from "./views/GetPrice"

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
        ResponsiveModule,
        ResizableModule
    ],
    declarations: [
        AppComponent,
        TopNav,
        MainView,
        Footer,
        Entry,
        MakeView,
        History,
        HasDeviceType,
        DeviceDetails,
        GetPrice
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
