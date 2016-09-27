/**
 * Created by Mtui on 9/24/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {ConditionType} from "../model/ConditionType";

declare var $:any;

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
                    <br>
                    <span class="heading-middle"><h2>Carrier</h2></span>
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
                <span class="heading-middle"><h2>Condition</h2></span>
                <div class="carriers inputs">      
                         <div class="input-container">
                         <input type="radio" onclick='conditionHandler();'  name="condition" value="GOOD">GOOD<br>
                        </div>
                        <div class="input-container">
                         <input type="radio" onclick='conditionHandler()'  name="condition" value="BAD">BAD<br>
                        </div>
                        <div class="input-container">
                         <input type="radio" onclick='conditionHandler();' name="condition" value="UGLY">UGLY<br>
                        </div>
                      
                </div>   
                      <div class="startbutton hidden" >
                                    <img on-mouseover="over(event)" on-mouseout="out(event)" src="/Images/moneybutton.svg"/>                                   
                                </div>
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
        debugger;
        this.resetButtons();
        var button = event.target;
        this.over(event);

        button.selected = true;
        this.displayCondition(button);
    }

    resetButtons() {
        $(".make-menu").find("img").each( function(){
            this.src = this.src.replace("hover","");
            this.selected = false;
        });
    }

    displayCondition(button) {
        $(".condition").css("display", "block");
    }

    conditionHandler() {
        //debugger;
        //this.userDevice.condition = ConditionType[event.target];
        //debugger;
        $(".startbutton.hidden").css({"display": "block !important", "visibility": "true"});
    }
}
