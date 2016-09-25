/**
 * Created by Mtui on 9/24/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice.js";

@Component({
    selector: "final-price",
    template: ` <topnav></topnav>
                <div class="app">
                    <span class="heading-pharse">
                        <h2>CHOOSE DEVICE AND CARRIER</h2>
                     </span>
                   <history></history>
                   <span class="title-display-list"><h2>{{userDevice.name}}</h2></span>
                   <div class="display-device center-border">
                         <img src="{{userDevice.resourceUrl}}"/>                        
                    </div>
                    <div class="carriers">
                    <ul>                      
                    <li><div  class="make-menu att-menu">
                        <img name="Att" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/att.png"/>
                    </div></li>
                     <li><div  class="make-menu sprint-menu">
                        <img name="Sprint" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/sprint.png"/>
                    </div></li>
                    <li>
                    <div  class="make-menu verizon-menu">
                        <img name="Verizon" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/verizon.png"/>
                    </div>
                    </li>
                    
                    <li> <div  class="make-menu tmobile-menu">
                        <img name="TMobile" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/tmobile.png"/>
                    </div>
                    
                    </li>
                    </ul>
                </div>
                <div class="condition">
                    
                </div>                
                <div class="footer-push"></div>
                </div>
                <footer></footer>
                    
                `
})

export class GetPrice {

    private filteredModel = [];

    ngOnInit() {
       this.userDevice.page = 3;
    }

    constructor(private userDevice: UserDevice) {

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
        this.displayCondition(button);
    }

    resetButton() {

    }

    displayCondition(button) {

    }
}
