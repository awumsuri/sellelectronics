/**
 * Created by Mtui on 9/21/16.
 */
import {Component, AfterContentInit, ApplicationRef} from "@angular/core";
import { Router } from "@angular/router";
import {UserDevice} from "../model/UserDevice";
import {Device} from "../model/Device";
import { DeviceTypes } from "../model/DeviceTypes";
import {DevicesModels} from "../model/DeviceModels";
import {Utils} from "../utils/Utils"
import {DeviceService} from "../services/DeviceService";
import {GetDeviceTypesPipe} from "../utils/GetDeviceTypesPipe";
import {GetDeviceByMakePipe} from "../utils/GetDeviceByMakePipe";
import {BaseView} from "./BaseView";

declare var $:any;

@Component({
    selector: 'device-details',

    template: `
                    <topnav></topnav>
                    <div class="app">
                    <div class="title-display">
                      <span class="heading-pharse">
                      <h2>CHOOSE DEVICE</h2>
                      </span>
                    </div>

                     <history></history>
                     <div class="makes">
                     <div class="device-containers">
                            <div *ngIf="(filteredModel.length > 0)" class="device-models">
                                 <div *ngIf="(filteredModel | hasDeviceType:2)" class="device-list iphone-list">
                                       <a><img name="Phone" (mouseover)="over($event)"
                        (mouseleave)="out($event)"
                        (click)="clickHandlerDevice($event)" src="/Images/iphoneType.png"/></a>
                                       <p><span class="title-list">Phone</span></p>
                                  </div>
                                  <div *ngIf="(filteredModel | hasDeviceType:1)" class="device-list ipad-list">
                                       <a><img name="Tablet" (mouseover)="over($event)"
                                                (mouseleave)="out($event)"
                        (click)="clickHandlerDevice($event)" src="/Images/ipad.png"/></a>
                                       <p><span class="title-list">Tablet</span></p>
                                  </div>
                                  <!--<div *ngIf="(filteredModel | hasDeviceType:3)" class="device-list macbook-list">
                                       <a><img name="Laptop" (mouseover)="over($event)"
                        (mouseleave)="out($event)"
                        (click)="clickHandlerDevice($event)" src="/Images/macbook.png"/></a>
                                        <span class="title-list">Mac</span>
                                  </div> -->

                            </div>
                            <div *ngIf="(filteredModel.length === 0)" class="device-models" centerDiv>
                                <span class="error title">NO DEVICES FOUND</span>
                            </div>
                      </div>

                      </div>
                        <div *ngIf="(displayData.length > 0)" class="list-items display-device">
                            <ul>
                               <li
                                 (click)="clickHandler($event)"
                                *ngFor="let device of displayData">
                                    <img name="{{device.name}}" src="{{device.resourceUrl}}"/>
                                    <span class="title-display-list"><p>{{device.displayName}}</p></span>
                                </li>
                            </ul>

                        </div>

                        <div class="footer-push"></div>

                    </div>
                    <footer></footer>
              `
})

export class DeviceDetailsView extends BaseView {

    private filteredModel: Device[] = [];
    private displayData: Device[] = [];

    ngOnInit() {
        this.userDevice.page = 2;
    }

    constructor(protected userDevice: UserDevice,
                private router: Router,
                private deviceData: DeviceService
                ) {

      super();

      this.showDeviceTypes();
    }

    showDeviceTypes() {
      this.filteredModel = this.deviceData.getDevices().filter(
        device => {
          return device.deviceModel === this.userDevice.deviceModel
        }
      );
    }

    clickHandlerDevice(event) {
        this.resetButtons();
        var button = event.target;
        this.over(event);

        button.selected = true;
        this.userDevice.deviceType = Utils.getDeviceType(button.name);
        this.displayDevices(button);
    }


    clickHandler(event) {
        var element:HTMLImageElement = event.target;
        this.userDevice.name = element.name;
        this.userDevice.resourceUrl = element.src;

        var devices: Device[] = this.displayData.filter( data => {
            return data.name === element.name;
        });

        this.userDevice.make = devices[0].make;
        this.userDevice.displayName = element.parentElement.querySelector("span p").innerHTML;
        this.userDevice.displayData = new GetDeviceByMakePipe().transform(this.filteredModel, this.userDevice.make);
        debugger;
        this.router.navigate(["device-list"]);
    }

    resetButtons() {
      $(".device-list").find("img").each( function(){
        this.src = this.src.replace("hover","");
        this.selected = false;
      });
    }

    displayDevices(button) {
      this.displayData = new GetDeviceTypesPipe().transform(this.filteredModel, this.userDevice.deviceType);
    }
}
