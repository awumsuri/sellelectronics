/**
 * Created by Mtui on 9/18/16.
 */
import { Component } from "@angular/core";
import { TopNav } from "./nav.js";
import { Footer } from "./footer.js";
import { History } from "./history.js";
declare var $:any;

@Component({
    selector: 'make-view',
    template: `<topnav></topnav>
                <div class="app">
                <span class="heading-pharse">
                    <h2>CHOOSE MAKE</h2>
                </span>
                <history></history>
                <div class="makes">
                    <div  class="iphone-menu make-menu">
                        <img (mouseover)="over($event)" (mouseleave)="out($event)" (click)="clickHandler($event)" src="/Images/iphoneIcon.jpg"/>
                    </div>
                    <div  class="make-menu samsung-menu">
                        <img (mouseover)="over($event)" (mouseleave)="out($event)" (click)="clickHandler($event)" src="/Images/samsungicon.jpg"/>
                    </div>
                </div>
                </div>
                 <footer></footer>`

})

export class MakeView{

    over(event) {

        var button = event.target;
        if(button.selected) return;

        var src = event.target.src;
        var indexExtentsion = src.indexOf(".");
        var extention = src.slice(indexExtentsion);
        var newSource = src.slice(0, indexExtentsion) + "hover" + extention;

        button.setAttribute("src",newSource);
    }

    out(event) {

        var button = event.target;
        if (button.selected) return;
        var src = event.target.src;
        var indexExtentsion = src.indexOf(".");
        var extention = src.slice(indexExtentsion);
        var hoverIndex = src.indexOf("hover");
        var newSource = (hoverIndex === -1) ? src : src.slice(0, hoverIndex) + extention;

        button.setAttribute("src",newSource);
    }

    clickHandler(event) {
        this.resetButtons();
        var button = event.target;
        this.over(event);

        button.selected = true;
    }

    resetButtons() {
        var iphone = $(".iphone-menu").find("img")[0];
        var samsung = $(".samsung-menu").find("img")[0];

        iphone.selected = false;
        samsung.selected = false;

        iphone.setAttribute("src", "/Images/iphoneIcon.jpg");
        samsung.setAttribute("src", "/Images/samsungicon.jpg");
    }
}