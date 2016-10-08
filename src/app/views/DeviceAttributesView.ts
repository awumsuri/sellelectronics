/**
 * Created by Mtui on 9/18/16.
 */
import {Component} from "@angular/core";
import { TopNavView } from "./NavView";
import { FooterView } from "./FooterView";
import { HistoryView } from "./HistoryView";
import { DeviceService } from "../services/DeviceService"
import {UserDevice} from "../model/UserDevice";
import {HasDeviceType } from "../utils/HasDeviceTypesPipe";
import {DevicesModels} from "../model/DeviceModels";
import {Device} from "../model/Device";
import {Router} from "@angular/router";
import {Utils} from "../utils/Utils"


declare var $:any;

@Component({
    selector: 'make-view',
    template: `        

                <topnav></topnav>
                <div  class="app">
                <div class="title-display">
                <span class="heading-pharse">
                    <h2>CHOOSE MANUFACTORER</h2>
                </span>
                </div>                
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
                    </div>
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
                 
                   <div class="footer-push"></div>
                </div>                   
                  <footer></footer>
                  `

})

export class MakeView {

    ngOnInit() {
        this.userDevice.page = 1;
    }

    constructor(private deviceService: DeviceService,
                private userDevice: UserDevice,
                private router: Router) {

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
        this.userDevice.deviceModel = Utils.getDeviceModel(button.name);
        this.router.navigate(['/device-details']);
    }
    resetButtons() {
        $(".make-menu").find("img").each( function(){
            this.src = this.src.replace("hover","");
            this.selected = false;
        });
    }
}
