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
 * Created by Mtui on 9/21/16.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var UserDevice_1 = require("../model/UserDevice");
var DeviceDetails = (function () {
    function DeviceDetails(userDevice, router, appRef) {
        this.userDevice = userDevice;
        this.router = router;
        this.appRef = appRef;
        this.displayData = [];
        this.displayData = this.userDevice.displayData;
    }
    DeviceDetails.prototype.ngOnInit = function () {
        this.userDevice.page = 2;
    };
    DeviceDetails.prototype.out = function (event) {
    };
    DeviceDetails.prototype.over = function (event) {
    };
    DeviceDetails.prototype.clickHandler = function (event) {
        this.userDevice.name = event.target.name;
        this.userDevice.resourceUrl = event.target.src;
        this.router.navigate(["/final-price"]);
    };
    DeviceDetails = __decorate([
        core_1.Component({
            selector: 'device-details',
            template: "    \n                    <topnav></topnav>\n                    <div class=\"app\">\n                    <span class=\"heading-pharse\">\n                        <h2>CHOOSE CONDITION AND CARRIER</h2>\n                     </span>\n                     <history></history>\n                        <div  class=\"display-device\">\n                            <ul>\n                                <li (mouseout)=\"out($event)\" \n                                (mouseover)=\"over($event);\"\n                                 (click)=\"clickHandler($event)\"\n                                *ngFor=\"let device of displayData\">\n                                    <img name=\"{{device.name}}\" src=\"{{device.resourceUrl}}\"/>\n                                    <span class=\"title-display-list\"><p>{{device.name}}</p></span>\n                                </li>\n                            </ul>                            \n                        </div>\n                                               <div class=\"footer-push\"></div>\n                    </div>        \n                   \n                    \n              "
        }), 
        __metadata('design:paramtypes', [UserDevice_1.UserDevice, router_1.Router, core_1.ApplicationRef])
    ], DeviceDetails);
    return DeviceDetails;
}());
exports.DeviceDetails = DeviceDetails;
//# sourceMappingURL=DeviceDetails.js.map