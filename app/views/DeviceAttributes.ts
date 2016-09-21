/**
 * Created by Mtui on 9/18/16.
 */
import {Component, Injectable} from "@angular/core";
import { TopNav } from "./Nav.js";
import { Footer } from "./Footer.js";
import { History } from "./History.js";
import { DeviceService } from "../services/DeviceService.js"
import {UserDevice} from "../model/UserDevice.js";

declare var $:any;

@Component({
    selector: 'make-view',
    template: `<topnav></topnav>
                <div class="app">
                <span class="heading-pharse">
                    <h2>CHOOSE MAKE</h2>
                </span>
                <history></history>
                <div class="makes">
                    <div  class="iphone-menu make-menu">
                        <img name="apple" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/iphoneIcon.jpg"/>
                    </div>
                    <div  class="make-menu samsung-menu">
                        <img name="samsung" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/samsungicon.jpg"/>
                    </div>
                     <div  class="make-menu blackberry-menu">
                        <img name="blackberry" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/blackberryicon.png"/>
                    </div>
                    <div  class="make-menu htc-menu">
                        <img name="htc" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/htcicon.png"/>
                    </div>
                    <div  class="make-menu lg-menu">
                        <img name="lg" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/lgicon.png"/>
                    </div>
                    <div  class="make-menu motorola-menu">
                        <img name="motorola" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/motorolaicon.png"/>
                    </div>
                     <div  class="make-menu nokia-menu">
                        <img name="nokia" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/nokiaicon.png"/>
                    </div>
                </div>
                </div>
                <router-outlet></router-outlet>
                 <footer></footer>`
})

export class MakeView {

    private deviceData;

    constructor(private deviceService: DeviceService, private userDevice: UserDevice) {
        this.deviceData = this.deviceService.getDevices();
        this.setState();
    }

    setState() {

    }

    over(event) {

        var button = event.target;
        if(button.selected) return;

        var src = event.target.src;
        var indexExtentsion = src.indexOf(".");
        var extention = src.slice(indexExtentsion);
        var newSource = src.slice(0, indexExtentsion) + "hover" + extention;

        button.setAttribute("src",newSource);
    }

    out(event) {

        var button = event.target;
        if (button.selected) return;
        var src = button.src;
        var indexExtentsion = src.indexOf(".");
        var extention = src.slice(indexExtentsion);
        var hoverIndex = src.indexOf("hover");
        var newSource = (hoverIndex === -1) ? src : src.slice(0, hoverIndex) + extention;

        button.setAttribute("src",newSource);
    }

    clickHandler(event) {
        this.resetButtons(event, this.out);
        var button = event.target;
        this.over(event);

        button.selected = true;
        this.displayDevices(button);
    }

    resetButtons(event, fn) {
        $(".make-menu").find("img").each( function(){
            this.selected = false;
            fn(event);
        });
    }

    displayDevices(button:HTMLImageElement) {

    }
}