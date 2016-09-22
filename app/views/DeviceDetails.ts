/**
 * Created by Mtui on 9/21/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice.js";
import {Footer} from "./Footer";

@Component({
    selector: 'device-details',
    template: `    <topnav></topnav>
                    <div class="app">
                    <span class="heading-pharse">
                        <h2>CHOOSE DEVICE AND CARRIER</h2>
                     </span>
                    </div>
                    <footer></footer>
              `
})

export class DeviceDetails {
    constructor(private userDevice: UserDevice) {

    }
}
