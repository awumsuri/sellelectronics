"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Mtui on 9/17/16.
 */
var core_1 = require("@angular/core");
var MainView = (function () {
    function MainView() {
    }
    MainView.prototype.over = function () {
        $('.startbutton').find("img").attr("src", "/Images/startbuttonhover.jpg");
    };
    MainView.prototype.out = function () {
        $('.startbutton').find("img").attr("src", "/Images/startbutton.jpg");
    };
    MainView = __decorate([
        core_1.Component({
            selector: 'main-view',
            template: "\n                    <div mwlResizable class=\"app\">\n                    <span class=\"heading-pharse\"><h2>SELL YOUR ELECTRONIC DEVICES BY CLICKING BELOW</h2></span>\n                               <div class=\"downbutton\">\n                                    <img src=\"/Images/downbutton.jpg\"/>                             \n                                </div> \n                                <div class=\"startbutton\" >\n                                    <img routerLink=\"/make\" routerLinkActive=\"active\" on-mouseover=\"over(event)\" on-mouseout=\"out(event)\" src=\"/Images/startbutton.jpg\"/>                                   \n                                </div>\n                                <div class=\"tradin\">\n                                    <span><a routerLink=\"/make\" routerLinkActive=\"active\">SELL YOUR DEVICE</a></span>         \n                                 </div>\n                    </div>                     \n                  ",
        }), 
        __metadata('design:paramtypes', [])
    ], MainView);
    return MainView;
}());
exports.MainView = MainView;
//# sourceMappingURL=MainView.js.map