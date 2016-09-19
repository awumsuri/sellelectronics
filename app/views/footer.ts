/**
 * Created by Mtui on 9/18/16.
 */

import {Component } from '@angular/core';
declare var $:any;

@Component({
    selector: 'footer',
    template: `<div class="footer-app">
            <span class="footer-text left">1-999-999-9999</span>     
              <div class="map"><a href="https://www.google.com/maps/place/30+6th+Ave,+New+York,+NY+10013/@40.7199901,-74.0073711,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2598ac19f1505:0xe91bd2f442592192!8m2!3d40.7199901!4d-74.0051824"><img (mouseover)="over()" (mouseleave)="out()" src="/Images/map.png"/></a> </div>
            <span class="footer-text right">30 6th Ave New York, NY</span>  
</div>`
})

export class Footer{
    over(){
        $('.map').find("img").attr("src", "/Images/maphover.png");
    }

    out() {
        $('.map').find("img").attr("src", "/Images/map.png");
    }
}
