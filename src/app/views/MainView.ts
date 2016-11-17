/**
 * Created by Mtui on 11/17/16.
 */
/**
 * Created by Mtui on 9/17/16.
 */
import {Component} from "@angular/core";
declare var $:any;

@Component({
  selector: 'main-view',
  template: `
                    <div mwlResizable class="app">

                                <div class="title-display">
                                <span class="heading-pharse">
                                    <h2>SELL YOUR ELECTRONIC DEVICES BY CLICKING BELOW</h2>
                                </span>
                                </div>
                               <div class="downbutton">
                                    <img src="/Images/downbutton.png"/>
                                </div>
                                <div class="startbutton" >
                                    <img routerLink="make" routerLinkActive="active" on-mouseover="over(event)" on-mouseout="out(event)" src="/Images/startbutton.png"/>
                                </div>
                                <div class="tradin">
                                    <span><a routerLink="make" routerLinkActive="active">SELL YOUR DEVICE</a></span>
                                 </div>
                    </div>
                  `,
})

export class MainView {

  over(){
    $('.startbutton').find("img").attr("src", "/Images/startbuttonhover.png");
  }

  out() {
    $('.startbutton').find("img").attr("src", "/Images/startbutton.png");
  }
}
