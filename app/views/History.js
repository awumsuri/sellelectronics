/**
 * Created by Mtui on 9/19/16.
 */
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
var core_1 = require('@angular/core');
var UserDevice_1 = require("../model/UserDevice");
var History = (function () {
    function History(userDevice) {
        this.userDevice = userDevice;
        this.css = "current-index-on";
    }
    History.prototype.getStyle = function (page) {
        if (page < this.userDevice.page)
            return "current-index-complete history-number";
        return (page === this.userDevice.page) ? "current-index-on history-number" : "current-index-off history-number";
    };
    History = __decorate([
        core_1.Component({
            selector: 'history',
            template: " \n                <div class=\"history-noborder\">\n                <div class=\"rotate-right downbutton\">\n                        <img class=\"left\" src=\"/Images/downbutton.jpg\"/>\n                  </div>\n                    <div class=\"history-nav\">                       \n                     <div class=\"number-container\">\n                        <div [ngClass]=\"getStyle(1)\"><span class=\"number\">1</span></div>\n                        <div [ngClass]=\"getStyle(2)\"><span class=\"number\">2</span></div>\n                        <div [ngClass]=\"getStyle(3)\"><span class=\"number\">3</span></div>                                              \n                      </div>\n                   </div>                \n                </div>\n                \n"
        }), 
        __metadata('design:paramtypes', [UserDevice_1.UserDevice])
    ], History);
    return History;
}());
exports.History = History;
//# sourceMappingURL=History.js.map