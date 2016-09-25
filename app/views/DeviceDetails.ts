/**
 * Created by Mtui on 9/21/16.
 */
import {Component, AfterContentInit, ApplicationRef} from "@angular/core";
import { Router } from "@angular/router";
import {UserDevice} from "../model/UserDevice.js";
import {Device} from "../model/Device.js"
import {Footer} from "./Footer";
declare var $:any;



@Component({
    selector: 'device-details',

    template: `    
                    <topnav></topnav>
                    <div class="app">
                    <span class="heading-pharse">
                        <h2>CHOOSE CONDITION AND CARRIER</h2>
                     </span>
                     <history></history>
                        <div  class="display-device">
                            <ul>
                                <li (mouseout)="out($event)" 
                                (mouseover)="over($event);"
                                 (click)="clickHandler($event)"
                                *ngFor="let device of displayData">
                                    <img name="{{device.name}}" src="{{device.resourceUrl}}"/>
                                    <span class="title-display-list"><p>{{device.name}}</p></span>
                                </li>
                            </ul>                            
                        </div>
                                               <div class="footer-push"></div>
                    </div>        
                   
                    
              `
})

export class DeviceDetails{

    private displayData: Device[] = [];

    ngOnInit() {
        this.userDevice.page = 2;
    }

    constructor(private userDevice: UserDevice,
                private router: Router,
                private appRef: ApplicationRef) {
        this.displayData = this.userDevice.displayData;
    }

    out(event) {

    }

    over(event) {

    }

    clickHandler(event) {
        this.userDevice.name = event.target.name;
        this.userDevice.resourceUrl = event.target.src;
        this.router.navigate(["/final-price"]);
    }

}
