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
                                 <div *ngIf="(filteredModel | hasDeviceType:1)" class="device-list iphone-list">
                                       <a><img name="Phone" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/iphoneType.png"/></a>
                                       <p><span class="title-list">Phone</span></p>
                                  </div>
                                  <div *ngIf="(filteredModel | hasDeviceType:3)" class="device-list macbook-list">
                                       <a><img name="Laptop" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/macbook.png"/></a>
                                        <span class="title-list">Laptop</span>
                                  </div>
                                   <div *ngIf="(filteredModel | hasDeviceType:2)" class="device-list ipad-list">
                                       <a><img name="Tablet" (mouseover)="over($event)" 
                                                (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/ipad.png"/></a>
                                       <p><span class="title-list">Tablet</span></p>
                                  </div>                             
                                  
                            </div>
                      </div>
                     
                      </div>
                     
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
                    <footer></footer>
              `
})

export class DeviceDetails{

    private iPhoneSize: string[] = [" 8", " 16", " 32", " 64", " 128"];
    private deviceTypes: DevicesModels[] = [];
    private filteredModel: Device[] = [];
    private displayData: Device[] = [];

    ngOnInit() {
        this.userDevice.page = 2;
    }

    constructor(private userDevice: UserDevice,
                private router: Router,
                private deviceData: DeviceService
                ) {

      this.showDeviceTypes();
    }

    showDeviceTypes() {
      this.filteredModel = this.deviceData.getDevices().filter(
        device => {
          return device.deviceModel === this.userDevice.deviceModel
        }
      );
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

    clickHandlerDevice(event) {
        this.resetButtons();
        var button = event.target;
        this.over(event);

        button.selected = true;
    }

    getDeviceSize(name): string {
        for(var i = 0; i < this.iPhoneSize.length; i++) {
            var sizeString: string = this.iPhoneSize[i];
            if(name.indexOf(sizeString) !== -1) {
                sizeString = sizeString.replace(" ", "");
                return sizeString+"GB";
            }
        }
    }

    clickHandler(event) {

        var element:HTMLImageElement = event.target;
        this.userDevice.name = element.name;
        this.userDevice.resourceUrl = element.src;
        var devices = this.displayData.filter( data => {
            return data.name === element.name;
        });
        this.userDevice.make = devices[0].make;
        this.userDevice.size = this.getDeviceSize(element.name);
        this.router.navigate(["/final-price"]);
    }

  resetButtons() {
    $(".device-containers").find("img").each( function(){
      this.src = this.src.replace("hover","");
      this.selected = false;
    });
  }

    displayDevices() {

    }



}
