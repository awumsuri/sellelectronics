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
    var MainView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MainView = class MainView {
                over() {
                    $('.startbutton').find("img").attr("src", "/Images/startbuttonhover.jpg");
                }
                out() {
                    $('.startbutton').find("img").attr("src", "/Images/startbutton.jpg");
                }
            };
            MainView = __decorate([
                core_1.Component({
                    selector: 'main-view',
                    template: `
                    <div mwlResizable class="app">
                    <span class="heading-pharse"><h2>SELL YOUR ELECTRONIC DEVICES BY CLICKING BELOW</h2></span>
                               <div class="downbutton">
                                    <img src="/Images/downbutton.jpg"/>                             
                                </div> 
                                <div class="startbutton" >
                                    <img routerLink="/make" routerLinkActive="active" on-mouseover="over(event)" on-mouseout="out(event)" src="/Images/startbutton.jpg"/>                                   
                                </div>
                                <div class="tradin">
                                    <span><a routerLink="/make" routerLinkActive="active">SELL YOUR DEVICE</a></span>         
                                 </div>
                    </div>                     
                  `,
                })
            ], MainView);
            exports_1("MainView", MainView);
        }
    }
});

//# sourceMappingURL=MainView.js.map
