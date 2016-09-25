/**
 * Created by Mtui on 9/17/16.
 */
import {Component} from "@angular/core";
declare var $:any;

@Component({
    selector: 'main-view',
        template: `
                    <div mwlResizable class="app">
                    <span class="heading-pharse"><h2>SELL YOUR ELECTRONIC DEVICES BY CLICKING BELOW</h2></span>
                               <div class="downbutton">
                                    <img src="/Images/downbutton.jpg"/>                             
                                </div> 
                                <div class="startbutton" >
                                    <img routerLink="/make" routerLinkActive="active" on-mouseover="over(event)" on-mouseout="out(event)" src="/Images/startbutton.jpg"/>                                   
                                </div>
                                <div class="tradin">
                                    <span><a routerLink="/make" routerLinkActive="active">SELL YOUR DEVICE</a></span>         
                                 </div>
                    </div>                     
                  `,
})

export class MainView {

    over(){
       $('.startbutton').find("img").attr("src", "/Images/startbuttonhover.jpg");
    }

    out() {
        $('.startbutton').find("img").attr("src", "/Images/startbutton.jpg");
    }
}

