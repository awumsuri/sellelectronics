/**
 * Created by Mtui on 9/21/16.
 */
import {Component, AfterContentInit, ApplicationRef} from "@angular/core";
import { Router } from "@angular/router";
import {UserDevice} from "../model/UserDevice";
import {Device} from "../model/Device"
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
                                    <img data-make="{{device.make}}" name="{{device.name}}" src="{{device.resourceUrl}}"/>
                                    <span class="title-display-list"><p>{{device.name}}</p></span>
                                </li>
                            </ul>                            
                        </div>
                                               <div class="footer-push"></div>
                    </div>                    
              `
})

export class DeviceDetails{

    private iPhoneSize: string[] = ["8", "16", "32", "64", "128"];

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

    getSize(name): number {
        for(var i = 0; i < this.iPhoneSize.length; i++) {
            if(name.indexOf(this.iPhoneSize[i]) !== -1) {
                return parseInt(this.iPhoneSize[i]);
            }
        }
    }

    clickHandler(event) {
        var element:HTMLImageElement = event.target;
        this.userDevice.name = element.name;
        this.userDevice.resourceUrl = element.src;
        this.userDevice.make = element["data-make"];
        this.userDevice.size = this.getSize(element.name);
        this.router.navigate(["/final-price"]);
    }

}
