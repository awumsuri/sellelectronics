/**
 * Created by Mtui on 9/17/16.
 */
import {Component} from "@angular/core";
declare var $:any;

@Component({
    selector: 'main-view',
        template: `
                   
                    
                    <div class="container">
                      <div class="row">
                        <div class="page-header">
                              <h1>SELL YOUR MACBOOK</h1>
                              <span class="icon-bar">
                                <i class="glyphicon glyphicon-tower" aria-hidden="true"></i>
                              </span>                                         
                            </div>
                      </div>
                    </div>
                   <div class="logo-main">
                        <img src="/Images/macbook/MacbookPro.png"/>                             
                    </div> 
                    <div class="startbutton" >
                        <img routerLink="make" routerLinkActive="active" on-mouseover="over(event)" on-mouseout="out(event)" src="/Images/startbutton.png"/>                                   
                    </div>
                    <div class="tradin">
                        <span><a routerLink="make" routerLinkActive="active">SELL YOUR DEVICE</a></span>         
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

