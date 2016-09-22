/**
 * Created by Mtui on 9/18/16.
 */

import {Component, Renderer} from '@angular/core';
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
    private closed:boolean = false;
    constructor(private renderer: Renderer) {
        var ua = navigator.userAgent.toLowerCase();
        var isSafari = (ua.indexOf("safari") != -1 && ua.indexOf("chrome") == -1);
        if( isSafari) {
            $("body").css("height", "auto !important");
            $("html").css("height", "auto !important");
        }
        this.shouldHideFooter();
        this.renderer.listenGlobal('window', 'scroll', (evt) => {
            this.shouldHideFooter();
        });

    }

    shouldHideFooter() {
        console.log($("body").scrollTop());
        if (!closed && $("body").scrollTop() < 25) {

            $('.footer-app').fadeOut(1);
            this.closed = true;
        }
        else{
            $('.footer-app').fadeIn(1);
            this.closed = false;
        }
    }

    over(){
        $('.map').find("img").attr("src", "/Images/maphover.png");
    }
    out() {
        $('.map').find("img").attr("src", "/Images/map.png");
    }
}
