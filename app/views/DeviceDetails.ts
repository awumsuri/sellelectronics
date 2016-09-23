/**
 * Created by Mtui on 9/21/16.
 */
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import {UserDevice} from "../model/UserDevice.js";
import {Device} from "../model/Device.js"
import {Footer} from "./Footer";

@Component({
    selector: 'device-details',
    template: `    <topnav></topnav>
                    <div class="app">
                    <span class="heading-pharse">
                        <h2>CHOOSE DEVICE AND CARRIER</h2>
                     </span>
                     <history></history>
                        <div class="display-device">
                            <ul>
                                <li (mouseout)="out($event)" (mouseover)="over($event);" *ngFor="let device of displayData">
                                    <img src="{{device.resourceUrl}}" />
                                    <span class="title-display-list"><p>{{device.name}}</p></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer></footer>
              `
})

export class DeviceDetails {

    private displayData: Device[] = [];

    ngOnInit() {
        this.userDevice.page = 2;
    }

    constructor(private userDevice: UserDevice,
                private router: Router) {
        this.displayData = this.userDevice.displayData;
    }

    out(event) {

    }

    over(event) {

    }

}
