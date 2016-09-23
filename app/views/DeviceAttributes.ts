/**
 * Created by Mtui on 9/18/16.
 */
import {Component} from "@angular/core";
import { TopNav } from "./Nav.js";
import { Footer } from "./Footer.js";
import { History } from "./History.js";
import { DeviceService } from "../services/DeviceService.js"
import {UserDevice} from "../model/UserDevice.js";
import {HasDeviceType } from "../utils/HasDeviceTypesPipe.js";
import {DevicesModels} from "../model/DeviceModels.js";
import {Device} from "../model/Device.js";
import {DeviceTypes} from "../model/DeviceTypes.js"
import {Router} from "@angular/router";

declare var $:any;

@Component({
    selector: 'make-view',
    template: `<topnav></topnav>
                <div class="app">
                <span class="heading-pharse">
                    <h2>CHOOSE DEVICE</h2>
                </span>
                <history></history>
                <div class="makes">
                    <ul>
                       <li> 
                       <div  class="iphone-menu make-menu">
                        <img name="Apple" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/iphoneIcon.png"/>
                    </div></li>
                    
                     <li><div  class="make-menu blackberry-menu">
                        <img name="Blackberry" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/blackberryicon.png"/>
                    </div></li>
                    <li><div  class="make-menu htc-menu">
                        <img name="HTC" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/htcicon.png"/>
                    </div></li>
                    <li><div  class="make-menu lg-menu">
                        <img name="LG" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/lgicon.png"/>
                    </div></li>
                    <li><div  class="make-menu motorola-menu">
                        <img name="Motorola" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/motorolaicon.png"/>
                    </div></li>
                     <li><div  class="make-menu nokia-menu">
                        <img name="Nokia" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/nokiaicon.png"/>
                    </div></li>
                    <li>
                    <div  class="make-menu samsung-menu">
                        <img name="Samsung" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/samsungicon.png"/>
                    </div>
                    </li>
                    </ul>
                </div>
                 <div  class="device-containers">
                            <div *ngIf="(filteredModel.length > 0)" class="device-models">
                                 <div *ngIf="(filteredModel | hasDeviceType:1)" class="device-list iphone-list">
                                       <a><img name="Phone" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/iphone.png"/></a>
                                       <span class="title-list"><p>Phone</p></span>
                                  </div>
                                  <!--<div *ngIf="(filteredModel | hasDeviceType:3)" class="device-list macbook-list">
                                       <a><img name="Laptop" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/macbook.png"/></a>
                                        <span class="title-list">Laptop</span>
                                  </div>-->
                                   <div *ngIf="(filteredModel | hasDeviceType:2)" class="device-list ipad-list">
                                       <a><img name="Tablet" (mouseover)="over($event)" 
                                                (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/ipad.png"/></a>
                                       <p><span class="title-list">Tablet</span></p>
                                  </div>
                                   
                                  
                            </div>
                      </div>                     
                </div>                   
                 <footer></footer>`,

})

export class MakeView {

    private deviceData;
    private filteredModel: Device[] = [];

    ngOnInit() {
        this.userDevice.page = 1;
    }

    constructor(private deviceService: DeviceService,
                private userDevice: UserDevice,
                private router: Router) {
        this.deviceData = this.deviceService.getDevices();
    }

    over(event) {
        var button = event.target;
        if(button.selected) return;

        var src = event.target.src;
        var indexExtentsion = src.indexOf(".png");
        var extention = src.slice(indexExtentsion);
        var newSource = src.slice(0, indexExtentsion) + "hover" + extention;

        button.setAttribute("src",newSource);
    }

    out(event) {
        var button = event.target;
        if (button.selected) return;

        button.src = button.src.replace("hover","");
    }

    clickHandler(event) {
        this.resetButtons();
        var button = event.target;
        this.over(event);

        button.selected = true;
        this.displayDevicesTypes(button);
    }

    clickHandlerDevice(event) {

        this.userDevice.deviceType = DeviceTypes[event.target.name];
        this.userDevice.displayData = this.filteredModel.filter(
            device => {
                return device.deviceType === this.userDevice.deviceType;
            }
        )

        this.router.navigate(['/device-details']);
    }

    resetButtons() {
        $(".make-menu").find("img").each( function(){
            this.src = this.src.replace("hover","");
            this.selected = false;
        });
    }

    displayDevicesTypes(button:HTMLImageElement) {
        var model = DevicesModels[button.name];

        this.userDevice.deviceModel = model;
        this.filteredModel = this.deviceData.filter(
            device => {
                return device.deviceModel === model
            }
        );
    }
}