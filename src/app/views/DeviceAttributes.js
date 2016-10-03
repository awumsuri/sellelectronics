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
 * Created by Mtui on 9/18/16.
 */
var core_1 = require("@angular/core");
var DeviceService_1 = require("../services/DeviceService");
var UserDevice_1 = require("../model/UserDevice");
var DeviceModels_1 = require("../model/DeviceModels");
var DeviceTypes_1 = require("../model/DeviceTypes");
var router_1 = require("@angular/router");
var MakeView = (function () {
    function MakeView(deviceService, userDevice, router) {
        this.deviceService = deviceService;
        this.userDevice = userDevice;
        this.router = router;
        this.filteredModel = [];
        this.deviceData = this.deviceService.getDevices();
    }
    MakeView.prototype.ngOnInit = function () {
        this.userDevice.page = 1;
    };
    MakeView.prototype.over = function (event) {
        var button = event.target;
        if (button.selected)
            return;
        var src = event.target.src;
        var indexExtentsion = src.indexOf(".png");
        var extention = src.slice(indexExtentsion);
        var newSource = src.slice(0, indexExtentsion) + "hover" + extention;
        button.setAttribute("src", newSource);
    };
    MakeView.prototype.out = function (event) {
        var button = event.target;
        if (button.selected)
            return;
        button.src = button.src.replace("hover", "");
    };
    MakeView.prototype.clickHandler = function (event) {
        this.resetButtons();
        var button = event.target;
        this.over(event);
        button.selected = true;
        this.displayDevicesTypes(button);
    };
    MakeView.prototype.clickHandlerDevice = function (event) {
        var _this = this;
        this.userDevice.deviceType = DeviceTypes_1.DeviceTypes[event.target.name];
        this.userDevice.displayData = this.filteredModel.filter(function (device) {
            return device.deviceType === _this.userDevice.deviceType;
        });
        this.router.navigate(['/device-details']);
    };
    MakeView.prototype.resetButtons = function () {
        $(".make-menu").find("img").each(function () {
            this.src = this.src.replace("hover", "");
            this.selected = false;
        });
    };
    MakeView.prototype.displayDevicesTypes = function (button) {
        var model = DeviceModels_1.DevicesModels[button.name];
        this.userDevice.deviceModel = model;
        this.filteredModel = this.deviceData.filter(function (device) {
            return device.deviceModel === model;
        });
    };
    MakeView = __decorate([
        core_1.Component({
            selector: 'make-view',
            template: "        \n\n                <topnav></topnav>\n                <div  class=\"app\">\n                <span class=\"heading-pharse\">\n                    <h2>CHOOSE DEVICE</h2>\n                </span>\n                <history></history>\n                <div class=\"makes\">\n                    <ul>\n                       <li> \n                       <div  class=\"iphone-menu make-menu\">\n                        <img name=\"Apple\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/iphoneIcon.png\"/>\n                    </div></li>\n                    \n                     <li><div  class=\"make-menu blackberry-menu\">\n                        <img name=\"Blackberry\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/blackberryicon.png\"/>\n                    </div></li>\n                    <li><div  class=\"make-menu htc-menu\">\n                        <img name=\"HTC\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/htcicon.png\"/>\n                    </div></li>\n                    <li><div  class=\"make-menu lg-menu\">\n                        <img name=\"LG\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/lgicon.png\"/>\n                    </div></li>\n                    <li><div  class=\"make-menu motorola-menu\">\n                        <img name=\"Motorola\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/motorolaicon.png\"/>\n                    </div></li>\n                     <li><div  class=\"make-menu nokia-menu\">\n                        <img name=\"Nokia\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/nokiaicon.png\"/>\n                    </div></li>\n                    <li>\n                    <div  class=\"make-menu samsung-menu\">\n                        <img name=\"Samsung\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/samsungicon.png\"/>\n                    </div>\n                    </li>\n                    </ul>\n                </div>\n                 <div class=\"device-containers\">\n                            <div *ngIf=\"(filteredModel.length > 0)\" class=\"device-models\">\n                                 <div *ngIf=\"(filteredModel | hasDeviceType:1)\" class=\"device-list iphone-list\">\n                                       <a><img name=\"Phone\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandlerDevice($event)\" src=\"/Images/iphone.png\"/></a>\n                                       <p><span class=\"title-list\">Phone</span></p>\n                                  </div>\n                                  <!--<div *ngIf=\"(filteredModel | hasDeviceType:3)\" class=\"device-list macbook-list\">\n                                       <a><img name=\"Laptop\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandlerDevice($event)\" src=\"/Images/macbook.png\"/></a>\n                                        <span class=\"title-list\">Laptop</span>\n                                  </div>-->\n                                   <div *ngIf=\"(filteredModel | hasDeviceType:2)\" class=\"device-list ipad-list\">\n                                       <a><img name=\"Tablet\" (mouseover)=\"over($event)\" \n                                                (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandlerDevice($event)\" src=\"/Images/ipad.png\"/></a>\n                                       <p><span class=\"title-list\">Tablet</span></p>\n                                  </div>                             \n                                  \n                            </div>\n                      </div>\n                                                                 <div class=\"footer-push\"></div>\n                </div>                   \n                  <footer></footer>\n                  "
        }), 
        __metadata('design:paramtypes', [DeviceService_1.DeviceService, UserDevice_1.UserDevice, router_1.Router])
    ], MakeView);
    return MakeView;
}());
exports.MakeView = MakeView;
//# sourceMappingURL=DeviceAttributes.js.map