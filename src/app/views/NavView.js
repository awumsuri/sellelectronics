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
var core_1 = require('@angular/core');
var TopNav = (function () {
    function TopNav() {
    }
    TopNav = __decorate([
        core_1.Component({
            selector: 'topnav',
            template: "\n<nav class=\"nav-top-menu\" >\n\t<a><span class=\"title\">Sell Electronics</span></a>\n</nav>\n<div class=\"logo\">\n\t<div *hideItDevice=\"['mobile']\" class=\"leftpanel\" >\t\t\n\t\t<img src=\"/Images/ipad.png\"/>\n\t</div>\n\t\t<div class=\"logo-image\">\n\t\t\t<a href=\"\"><img src=\"/Images/iphone.jpg\"/></a>\n\t\t</div>\n\t<div *hideItDevice=\"['mobile']\" class=\"rightpanel\">\n\t\t<a href=\"\"><img src=\"/Images/macbook.png\"/></a>\n\t</div>\n</div>\n<nav  class=\"menu\">\t\t\n    <a  href=\"#\"><img src=\"/Images/appleicon.png\"/></a> \t\t\n    <a class=\"samsung\" href=\"#\" style=\"border-right-style: none !important;\"><img src=\"/Images/samsuguicon.png\"/></a>\n</nav>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], TopNav);
    return TopNav;
}());
exports.TopNav = TopNav;
//# sourceMappingURL=Nav.js.map