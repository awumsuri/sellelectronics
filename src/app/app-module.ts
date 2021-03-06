import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app-component";
import {TopNavView} from "./views/NavView";
import {FooterView} from "./views/FooterView";
import { appRoutingProviders } from "./app.routes";
import {EntryView} from "./views/EntryView";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { MakeView } from "./views/DeviceAttributesView";
import { HistoryView } from "./views/HistoryView"
import { DeviceService } from "./services/DeviceService";
import { HttpModule} from "@angular/http"
import {UserDevice} from "./model/UserDevice";
import {ResponsiveModule, ResponsiveConfigInterface} from "ng2-responsive";
import {HasDeviceType} from "./utils/HasDeviceTypesPipe";
import {DeviceDetailsView} from "./views/DeviceDetailsView";
import {ResizableModule} from "angular2-resizable";
import {GetPriceView} from "./views/GetPriceView"
import {FindPricePipe} from "./utils/FindPricePipe";
import {GetDeviceTypesPipe} from "./utils/GetDeviceTypesPipe";
import {DeviceTypes} from "./model/DeviceTypes";
import {CenterDivDirective} from "./directives/CenterDivDirective";
import {DeviceListView} from "./views/DeviceListView";
import {MainView} from "./views/MainView";
import {GetDeviceByMakePipe} from "./utils/GetDeviceByMakePipe";
import {FilterCarrierPipe} from "./utils/FilterCarrierPipe";
import {GetDeviceModelPipe} from "./utils/GetDeviceModelPipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MacDetailsView} from "./views/MacDetailsView";
import {ArraySortPipe} from "./utils/SortPipe";
import {SortByYear} from "./utils/SortYearPipe"


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
        ResizableModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        TopNavView,
        MainView,
        FooterView,
        EntryView,
        MakeView,
        DeviceListView,
        HistoryView,
        HasDeviceType,
        DeviceDetailsView,
        GetPriceView,
        MacDetailsView,
        FindPricePipe,
        GetDeviceTypesPipe,
        GetDeviceByMakePipe,
        FindPricePipe,
        FilterCarrierPipe,
        GetDeviceModelPipe,
        ArraySortPipe,
        SortByYear,
        CenterDivDirective
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
