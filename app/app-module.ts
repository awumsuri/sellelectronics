import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app-component.js";
import {TopNav} from "./views/nav.js";


@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, TopNav],
    bootstrap: [AppComponent]

})

export  class AppModule{}
