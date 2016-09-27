System.register(["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var GetPrice;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GetPrice = class GetPrice {
                constructor(userDevice) {
                    this.userDevice = userDevice;
                    this.filteredModel = [];
                }
                ngOnInit() {
                    this.userDevice.page = 3;
                }
                over(event) {
                    var button = event.target;
                    if (button.selected)
                        return;
                    var src = event.target.src;
                    var indexExtentsion = src.indexOf(".png");
                    var extention = src.slice(indexExtentsion);
                    var newSource = src.slice(0, indexExtentsion) + "hover" + extention;
                    button.setAttribute("src", newSource);
                }
                out(event) {
                    var button = event.target;
                    if (button.selected)
                        return;
                    button.src = button.src.replace("hover", "");
                }
                clickHandler(event) {
                    this.resetButtons();
                    var button = event.target;
                    this.over(event);
                    button.selected = true;
                    this.displayCondition(button);
                }
                resetButtons() {
                    $(".make-menu").find("img").each(function () {
                        this.src = this.src.replace("hover", "");
                        this.selected = false;
                    });
                }
                displayCondition(button) {
                    $(".condition").css("display", "block");
                }
                conditionHandler() {
                    debugger;
                    //this.userDevice.condition = ConditionType[event.target];
                    debugger;
                    $(".startbutton.hidder").css({ "display": "block !important", "visibility": "true" });
                }
            };
            GetPrice = __decorate([
                core_1.Component({
                    selector: "final-price",
                    template: ` <topnav></topnav>
                <div class="app">
                    <span class="heading-pharse">
                        <h2>CHOOSE DEVICE AND CARRIER</h2>
                     </span>
                   <history></history>
                   <span class="title-display-list"><h2>{{userDevice.name}}</h2></span>
                   <div class="display-device center-border">
                         <img src="{{userDevice.resourceUrl}}"/>                        
                    </div>
                    <br>
                    <span class="heading-middle"><h2>Carrier</h2></span>
                    <div class="carriers">
                    <ul>                      
                    <li><div  class="make-menu att-menu">
                        <img name="Att" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/att.png"/>
                    </div></li>
                     <li><div  class="make-menu sprint-menu">
                        <img name="Sprint" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/sprint.png"/>
                    </div></li>
                    <li>
                    <div  class="make-menu verizon-menu">
                        <img name="Verizon" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/verizon.png"/>
                    </div>
                    </li>
                    
                    <li> <div  class="make-menu tmobile-menu">
                        <img name="TMobile" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/tmobile.png"/>
                    </div>
                    
                    </li>
                    </ul>
                </div>
                <div class="condition">
                <span class="heading-middle"><h2>Condition</h2></span>
                <div class="carriers inputs">      
                         <div class="input-container">
                         <input type="radio" onclick='$(".startbutton.hidder").css({"display": "block !important", "visibility": "true"}); '  name="condition" value="GOOD">GOOD<br>
                        </div>
                        <div class="input-container">
                         <input type="radio" onclick=' $(".startbutton.hidder").css({"display": "block !important", "visibility": "true"}); '  name="condition" value="BAD">BAD<br>
                        </div>
                        <div class="input-container">
                         <input type="radio" onclick=' $(".startbutton.hidder").css({"display": "block !important", "visibility": "true"}); ' name="condition" value="UGLY">UGLY<br>
                        </div>
                      
                </div>   
                      <div class="startbutton hidden" >
                                    <img routerLink="/make" routerLinkActive="active" on-mouseover="over(event)" on-mouseout="out(event)" src="/Images/moneybutton.svg"/>                                   
                                </div>
                       </div>
                <div class="footer-push"></div>
                </div>
                <footer></footer>
                    
                `
                })
            ], GetPrice);
            exports_1("GetPrice", GetPrice);
        }
    }
});

//# sourceMappingURL=GetPrice.js.map
