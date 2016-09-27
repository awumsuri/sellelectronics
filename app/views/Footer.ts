/**
 * Created by Mtui on 9/18/16.
 */

import {Component, Renderer, AfterContentInit, ApplicationRef} from '@angular/core';
declare var $:any;

@Component({
    selector: 'footer',
    template: `<div class="footer-app">
            <span class="footer-text left">1-999-999-9999</span>     
              <div class="map"><a href="https://www.google.com/maps/place/30+6th+Ave,+New+York,+NY+10013/@40.7199901,-74.0073711,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2598ac19f1505:0xe91bd2f442592192!8m2!3d40.7199901!4d-74.0051824"><img (mouseover)="over()" (mouseleave)="out()" src="/Images/map.png"/></a> </div>
            <span class="footer-text right">30 6th Ave New York, NY</span>  
</div>`
})

export class Footer implements AfterContentInit{

    private closed:boolean = false;

    constructor(private renderer: Renderer, private appRef: ApplicationRef) {
        /*var ua = navigator.userAgent.toLowerCase();
         var isSafari = (ua.indexOf("safari") != -1 && ua.indexOf("chrome") == -1);
         if( isSafari) {
         $("body").css("height", "auto !important");
         $("html").css("height", "auto !important");
         }
         this.shouldHideFooter();
         this.renderer.listenGlobal('window', 'scroll', (evt) => {
         this.shouldHideFooter();
         });

         this.renderer.listenGlobal('window', 'orientationchange', (evt) => {
         this.shouldHideFooter();
         });

         }

         shouldHideFooter() {

         if (!closed && $("body").scrollTop() < 25 || ($("body").height() - $("body").scrollTop() - 23) < 0 ) {

         $('.footer-app').fadeOut(1);
         this.closed = true;
         }
         else{
         $('.footer-app').fadeIn(1);
         this.closed = false;
         }
         }*/
        this.appRef.tick();
    }

    public resizeHandler() {
        if($("history").length === 0) return;
        setTimeout(() => this.getContentHeight(), 100);
    }

    getContentHeight() {
        var docHeight = $(window).height();
        var footerHeight = $('footer').height();
        var footerTop = $('footer').position().top + footerHeight;

        if (footerTop < docHeight) {
            $('#footer').css('margin-top', 1200/*((200+ (docHeight - footerTop)) + 'px')*/);
        }
        return;
        /*var containerHeight = $(".app")[0].scrollHeight;
        var navHeight = $("topnav").height() ;
        var historyHeight =  $("history").height();
        var footer = $(".footer-app");
        footer.css("top", (containerHeight + navHeight + historyHeight + (this.isMobile() ? 800 : 560)));
        footer.css("position", "absolute");*/
    }

    isMobile() {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
            return true;
        return false;
    }

    over(){
        $('.map').find("img").attr("src", "/Images/maphover.png");
    }
    out() {
        $('.map').find("img").attr("src", "/Images/map.png");
    }

    ngAfterContentInit() {
        this.resizeHandler();
    }
}