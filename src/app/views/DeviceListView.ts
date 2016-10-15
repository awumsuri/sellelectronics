/**
 * Created by Mtui on 9/29/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {BaseView} from "./BaseView";
import {Device} from "../model/Device";
import { Router } from "@angular/router";

@Component({
    selector: "device-list",
    template: `
                 <topnav></topnav>
                    <div class="app">
                    <div class="title-display">
                      <span class="heading-pharse">
                        <h2>CHOOSE SIZE FOR <span class="orange-title">{{userDevice.displayName}}</span></h2>
                      </span>
                    </div>
                    
                    <br/>
                    <history></history>   
                    <br>
                    
                    <div *ngIf="(devices.length > 0)" class="list-items display-device display-device-list">                                                 
                            <ul>
                               <li 
                                 (click)="clickHandler($event)"
                                *ngFor="let device of devices">
                                    <img name="{{device.name}}" src="{{userDevice.resourceUrl}}"/>
                                    <span class="title-display-list"><p>{{device.name}}</p></span>
                                </li>
                            </ul>
                         
                        </div>
                        <div class="footer-push"></div>
                        </div>                   
                        <footer></footer>
                    
                `
})

export class DeviceListView extends  BaseView{

  private devices: Device[] = [];
  private sizes: string[] = [" 8", " 16", " 32", " 64", " 128"];

  ngOnInit() {
    this.devices = this.userDevice.displayData;
    this.userDevice.page = 2;
  }

  constructor(protected userDevice:UserDevice,
              private router:Router){
    super(userDevice);
  };

  getDeviceSize(name): string {
    for(var i = 0; i < this.sizes.length; i++) {
      var sizeString: string = this.sizes[i];
      if(name.indexOf(sizeString) !== -1) {
        sizeString = sizeString.replace(" ", "");
        return sizeString+"GB";
      }
    }
  }

  clickHandler(event) {
    var button:HTMLImageElement = event.target;
    this.userDevice.displayName = button.name;
    this.userDevice.name = button.name;
    this.userDevice.size = this.getDeviceSize(button.name);
    this.router.navigate(['final-price']);
  }

}

