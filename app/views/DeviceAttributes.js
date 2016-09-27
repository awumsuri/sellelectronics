System.register(["@angular/core", "../model/DeviceModels", "../model/DeviceTypes"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, DeviceModels_1, DeviceTypes_1;
    var MakeView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DeviceModels_1_1) {
                DeviceModels_1 = DeviceModels_1_1;
            },
            function (DeviceTypes_1_1) {
                DeviceTypes_1 = DeviceTypes_1_1;
            }],
        execute: function() {
            MakeView = class MakeView {
                constructor(deviceService, userDevice, router) {
                    this.deviceService = deviceService;
                    this.userDevice = userDevice;
                    this.router = router;
                    this.filteredModel = [];
                    this.deviceData = this.deviceService.getDevices();
                }
                ngOnInit() {
                    this.userDevice.page = 1;
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
                    this.displayDevicesTypes(button);
                }
                clickHandlerDevice(event) {
                    this.userDevice.deviceType = DeviceTypes_1.DeviceTypes[event.target.name];
                    this.userDevice.displayData = this.filteredModel.filter(device => {
                        return device.deviceType === this.userDevice.deviceType;
                    });
                    this.router.navigate(['/device-details']);
                }
                resetButtons() {
                    $(".make-menu").find("img").each(function () {
                        this.src = this.src.replace("hover", "");
                        this.selected = false;
                    });
                }
                displayDevicesTypes(button) {
                    var model = DeviceModels_1.DevicesModels[button.name];
                    this.userDevice.deviceModel = model;
                    this.filteredModel = this.deviceData.filter(device => {
                        return device.deviceModel === model;
                    });
                }
            };
            MakeView = __decorate([
                core_1.Component({
                    selector: 'make-view',
                    template: `        

                <topnav></topnav>
                <div  class="app">
                <span class="heading-pharse">
                    <h2>CHOOSE DEVICE</h2>
                </span>
                <history></history>
                <div class="makes">
                    <ul>
                       <li> 
                       <div  class="iphone-menu make-menu">
                        <img name="Apple" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/iphoneIcon.png"/>
                    </div></li>
                    
                     <li><div  class="make-menu blackberry-menu">
                        <img name="Blackberry" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/blackberryicon.png"/>
                    </div></li>
                    <li><div  class="make-menu htc-menu">
                        <img name="HTC" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/htcicon.png"/>
                    </div></li>
                    <li><div  class="make-menu lg-menu">
                        <img name="LG" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/lgicon.png"/>
                    </div></li>
                    <li><div  class="make-menu motorola-menu">
                        <img name="Motorola" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/motorolaicon.png"/>
                    </div></li>
                     <li><div  class="make-menu nokia-menu">
                        <img name="Nokia" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/nokiaicon.png"/>
                    </div></li>
                    <li>
                    <div  class="make-menu samsung-menu">
                        <img name="Samsung" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/samsungicon.png"/>
                    </div>
                    </li>
                    </ul>
                </div>
                 <div class="device-containers">
                            <div *ngIf="(filteredModel.length > 0)" class="device-models">
                                 <div *ngIf="(filteredModel | hasDeviceType:1)" class="device-list iphone-list">
                                       <a><img name="Phone" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/iphone.png"/></a>
                                       <p><span class="title-list">Phone</span></p>
                                  </div>
                                  <!--<div *ngIf="(filteredModel | hasDeviceType:3)" class="device-list macbook-list">
                                       <a><img name="Laptop" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/macbook.png"/></a>
                                        <span class="title-list">Laptop</span>
                                  </div>-->
                                   <div *ngIf="(filteredModel | hasDeviceType:2)" class="device-list ipad-list">
                                       <a><img name="Tablet" (mouseover)="over($event)" 
                                                (mouseleave)="out($event)" 
                        (click)="clickHandlerDevice($event)" src="/Images/ipad.png"/></a>
                                       <p><span class="title-list">Tablet</span></p>
                                  </div>                             
                                  
                            </div>
                      </div>
                                                                 <div class="footer-push"></div>
                </div>                   
                  <footer></footer>
                  `
                })
            ], MakeView);
            exports_1("MakeView", MakeView);
        }
    }
});

//# sourceMappingURL=DeviceAttributes.js.map
