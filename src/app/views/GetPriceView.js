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
 * Created by Mtui on 9/24/16.
 */
var core_1 = require("@angular/core");
var UserDevice_1 = require("../model/UserDevice");
var GetPrice = (function () {
    function GetPrice(userDevice) {
        this.userDevice = userDevice;
        this.filteredModel = [];
    }
    GetPrice.prototype.ngOnInit = function () {
        this.userDevice.page = 3;
    };
    GetPrice.prototype.over = function (event) {
        var button = event.target;
        if (button.selected)
            return;
        var src = event.target.src;
        var indexExtentsion = src.indexOf(".png");
        var extention = src.slice(indexExtentsion);
        var newSource = src.slice(0, indexExtentsion) + "hover" + extention;
        button.setAttribute("src", newSource);
    };
    GetPrice.prototype.out = function (event) {
        var button = event.target;
        if (button.selected)
            return;
        button.src = button.src.replace("hover", "");
    };
    GetPrice.prototype.clickHandler = function (event) {
        debugger;
        this.resetButtons();
        var button = event.target;
        this.over(event);
        button.selected = true;
        this.displayCondition(button);
    };
    GetPrice.prototype.resetButtons = function () {
        $(".make-menu").find("img").each(function () {
            this.src = this.src.replace("hover", "");
            this.selected = false;
        });
    };
    GetPrice.prototype.displayCondition = function (button) {
        $(".condition").css("display", "block");
    };
    GetPrice.prototype.conditionHandler = function () {
        //debugger;
        //this.userDevice.condition = ConditionType[event.target];
        //debugger;
        $(".startbutton.hidden").css({ "display": "block !important", "visibility": "true" });
    };
    GetPrice = __decorate([
        core_1.Component({
            selector: "final-price",
            template: " <topnav></topnav>\n                <div class=\"app\">\n                    <span class=\"heading-pharse\">\n                        <h2>CHOOSE DEVICE AND CARRIER</h2>\n                     </span>\n                   <history></history>\n                   <span class=\"title-display-list\"><h2>{{userDevice.name}}</h2></span>\n                   <div class=\"display-device center-border\">\n                         <img src=\"{{userDevice.resourceUrl}}\"/>                        \n                    </div>\n                    <br>\n                    <span class=\"heading-middle\"><h2>Carrier</h2></span>\n                    <div class=\"carriers\">\n                    <ul>                      \n                    <li><div  class=\"make-menu att-menu\">\n                        <img name=\"Att\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/carries/att.png\"/>\n                    </div></li>\n                     <li><div  class=\"make-menu sprint-menu\">\n                        <img name=\"Sprint\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/carries/sprint.png\"/>\n                    </div></li>\n                    <li>\n                    <div  class=\"make-menu verizon-menu\">\n                        <img name=\"Verizon\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/carries/verizon.png\"/>\n                    </div>\n                    </li>\n                    \n                    <li> <div  class=\"make-menu tmobile-menu\">\n                        <img name=\"TMobile\" (mouseover)=\"over($event)\" \n                        (mouseleave)=\"out($event)\" \n                        (click)=\"clickHandler($event)\" \n                        src=\"/Images/carries/tmobile.png\"/>\n                    </div>\n                    \n                    </li>\n                    </ul>\n                </div>\n                <div class=\"condition\">\n                <span class=\"heading-middle\"><h2>Condition</h2></span>\n                <div class=\"carriers inputs\">      \n                         <div class=\"input-container\">\n                         <input type=\"radio\" onclick='conditionHandler();'  name=\"condition\" value=\"GOOD\">GOOD<br>\n                        </div>\n                        <div class=\"input-container\">\n                         <input type=\"radio\" onclick='conditionHandler()'  name=\"condition\" value=\"BAD\">BAD<br>\n                        </div>\n                        <div class=\"input-container\">\n                         <input type=\"radio\" onclick='conditionHandler();' name=\"condition\" value=\"UGLY\">UGLY<br>\n                        </div>\n                      \n                </div>   \n                      <div class=\"startbutton hidden\" >\n                                    <img on-mouseover=\"over(event)\" on-mouseout=\"out(event)\" src=\"/Images/moneybutton.svg\"/>                                   \n                                </div>\n                       </div>\n                <div class=\"footer-push\"></div>\n                </div>\n                <footer></footer>\n                    \n                "
        }), 
        __metadata('design:paramtypes', [UserDevice_1.UserDevice])
    ], GetPrice);
    return GetPrice;
}());
exports.GetPrice = GetPrice;
//# sourceMappingURL=GetPrice.js.map