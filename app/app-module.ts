import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app-component.js";
import { TopNav } from "./views/nav.js";
import { MainView } from "./views/main-view.js";
import { Footer } from "./views/footer.js";
import { SelectionPage } from "./views/selection-view.js";
import { appRoutingProviders } from "./app.routes.js";
import { Entry } from "./views/entry.js";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes.js";
import { MakeView } from "./views/make.js";
import { History } from "./views/history.js"



@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        AppComponent,
        TopNav,
        MainView,
        Footer,
        SelectionPage,
        Entry,
        MakeView,
        History
    ],
    providers:[
        appRoutingProviders
    ],
    bootstrap: [AppComponent]

})

export  class AppModule{}
