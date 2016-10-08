/**
 * Created by Mtui on 9/29/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {BaseView} from "./BaseView";

@Component({
    selector: "final-price",
    template: `
                 <topnav></topnav>
                    <div class="app">
                    <div class="title-display">
                      <span class="heading-pharse">
                        <h2>CHOOSE {{userDevice.displayName}} SIZE</h2>
                      </span>
                    </div>
                    
                `
})

export class DeviceListView extends  BaseView{
  constructor(protected userDevice:UserDevice){
    super(userDevice);
  };

}

