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
    var DeviceDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DeviceDetails = class DeviceDetails {
                constructor(userDevice, router, appRef) {
                    this.userDevice = userDevice;
                    this.router = router;
                    this.appRef = appRef;
                    this.displayData = [];
                    this.displayData = this.userDevice.displayData;
                }
                ngOnInit() {
                    this.userDevice.page = 2;
                }
                out(event) {
                }
                over(event) {
                }
                clickHandler(event) {
                    this.userDevice.name = event.target.name;
                    this.userDevice.resourceUrl = event.target.src;
                    this.router.navigate(["/final-price"]);
                }
            };
            DeviceDetails = __decorate([
                core_1.Component({
                    selector: 'device-details',
                    template: `    
                    <topnav></topnav>
                    <div class="app">
                    <span class="heading-pharse">
                        <h2>CHOOSE CONDITION AND CARRIER</h2>
                     </span>
                     <history></history>
                        <div  class="display-device">
                            <ul>
                                <li (mouseout)="out($event)" 
                                (mouseover)="over($event);"
                                 (click)="clickHandler($event)"
                                *ngFor="let device of displayData">
                                    <img name="{{device.name}}" src="{{device.resourceUrl}}"/>
                                    <span class="title-display-list"><p>{{device.name}}</p></span>
                                </li>
                            </ul>                            
                        </div>
                                               <div class="footer-push"></div>
                    </div>        
                   
                    
              `
                })
            ], DeviceDetails);
            exports_1("DeviceDetails", DeviceDetails);
        }
    }
});

//# sourceMappingURL=DeviceDetails.js.map
