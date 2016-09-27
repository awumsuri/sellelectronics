/**
 * Created by Mtui on 9/19/16.
 */
System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var History;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            History = class History {
                constructor(userDevice) {
                    this.userDevice = userDevice;
                    this.css = "current-index-on";
                }
                getStyle(page) {
                    if (page < this.userDevice.page)
                        return "current-index-complete history-number";
                    return (page === this.userDevice.page) ? "current-index-on history-number" : "current-index-off history-number";
                }
            };
            History = __decorate([
                core_1.Component({
                    selector: 'history',
                    template: ` 
                <div class="history-noborder">
                <div class="rotate-right downbutton">
                        <img class="left" src="/Images/downbutton.jpg"/>
                  </div>
                    <div class="history-nav">                       
                     <div class="number-container">
                        <div [ngClass]="getStyle(1)"><span class="number">1</span></div>
                        <div [ngClass]="getStyle(2)"><span class="number">2</span></div>
                        <div [ngClass]="getStyle(3)"><span class="number">3</span></div>                                              
                      </div>
                   </div>                
                </div>
                
`
                })
            ], History);
            exports_1("History", History);
        }
    }
});

//# sourceMappingURL=History.js.map
