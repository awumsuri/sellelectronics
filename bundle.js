var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app/views/Nav", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var TopNav;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TopNav = class TopNav {
            };
            TopNav = __decorate([
                core_1.Component({
                    selector: 'topnav',
                    template: `
<nav class="nav-top-menu" >
	<a><span class="title">Sell Electronics</span></a>
</nav>
<div class="logo">
	<div *hideItDevice="['mobile']" class="leftpanel" >		
		<img src="/Images/ipad.png"/>
	</div>
		<div class="logo-image">
			<a href=""><img src="/Images/iphone.jpg"/></a>
		</div>
	<div *hideItDevice="['mobile']" class="rightpanel">
		<a href=""><img src="/Images/macbook.png"/></a>
	</div>
</div>
<nav  class="menu">		
    <a  href="#"><img src="/Images/appleicon.png"/></a> 		
    <a class="samsung" href="#" style="border-right-style: none !important;"><img src="/Images/samsuguicon.png"/></a>
</nav>
`
                }), 
                __metadata('design:paramtypes', [])
            ], TopNav);
            exports_1("TopNav", TopNav);
        }
    }
});
System.register("app/views/MainView", ["@angular/core"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2;
    var MainView;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
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
                core_2.Component({
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
                }), 
                __metadata('design:paramtypes', [])
            ], MainView);
            exports_2("MainView", MainView);
        }
    }
});
/**
 * Created by Mtui on 9/18/16.
 */
System.register("app/views/Entry", ['@angular/core'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3;
    var Entry;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            }],
        execute: function() {
            Entry = class Entry {
            };
            Entry = __decorate([
                core_3.Component({
                    selector: 'entry',
                    template: '<topnav></topnav><main-view></main-view><footer></footer>'
                }), 
                __metadata('design:paramtypes', [])
            ], Entry);
            exports_3("Entry", Entry);
        }
    }
});
System.register("app/app-component", ['@angular/core'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4;
    var AppComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            AppComponent = class AppComponent {
            };
            AppComponent = __decorate([
                core_4.Component({
                    selector: 'app',
                    template: '<router-outlet></router-outlet>'
                }), 
                __metadata('design:paramtypes', [])
            ], AppComponent);
            exports_4("AppComponent", AppComponent);
        }
    }
});
/**
 * Created by Mtui on 9/18/16.
 */
System.register("app/views/Footer", ['@angular/core'], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_5;
    var Footer;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            }],
        execute: function() {
            Footer = class Footer {
                constructor(renderer, appRef) {
                    this.renderer = renderer;
                    this.appRef = appRef;
                    this.closed = false;
                    /*var ua = navigator.userAgent.toLowerCase();
                     var isSafari = (ua.indexOf("safari") != -1 && ua.indexOf("chrome") == -1);
                     if( isSafari) {
                     $("body").css("height", "auto !important");
                     $("html").css("height", "auto !important");
                     }
                     this.shouldHideFooter();
                     this.renderer.listenGlobal('window', 'scroll', (evt) => {
                     this.shouldHideFooter();
                     });
            
                     this.renderer.listenGlobal('window', 'orientationchange', (evt) => {
                     this.shouldHideFooter();
                     });
            
                     }
            
                     shouldHideFooter() {
            
                     if (!closed && $("body").scrollTop() < 25 || ($("body").height() - $("body").scrollTop() - 23) < 0 ) {
            
                     $('.footer-app').fadeOut(1);
                     this.closed = true;
                     }
                     else{
                     $('.footer-app').fadeIn(1);
                     this.closed = false;
                     }
                     }*/
                    this.appRef.tick();
                }
                resizeHandler() {
                    if ($("history").length === 0)
                        return;
                    setTimeout(() => this.getContentHeight(), 100);
                }
                getContentHeight() {
                    var docHeight = $(window).height();
                    var footerHeight = $('footer').height();
                    var footerTop = $('footer').position().top + footerHeight;
                    if (footerTop < docHeight) {
                        $('#footer').css('margin-top', 1200 /*((200+ (docHeight - footerTop)) + 'px')*/);
                    }
                    return;
                    /*var containerHeight = $(".app")[0].scrollHeight;
                    var navHeight = $("topnav").height() ;
                    var historyHeight =  $("history").height();
                    var footer = $(".footer-app");
                    footer.css("top", (containerHeight + navHeight + historyHeight + (this.isMobile() ? 800 : 560)));
                    footer.css("position", "absolute");*/
                }
                isMobile() {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
                        return true;
                    return false;
                }
                over() {
                    $('.map').find("img").attr("src", "/Images/maphover.png");
                }
                out() {
                    $('.map').find("img").attr("src", "/Images/map.png");
                }
                ngAfterContentInit() {
                    this.resizeHandler();
                }
            };
            Footer = __decorate([
                core_5.Component({
                    selector: 'footer',
                    template: `<div class="footer-app">
            <span class="footer-text left">1-999-999-9999</span>     
              <div class="map"><a href="https://www.google.com/maps/place/30+6th+Ave,+New+York,+NY+10013/@40.7199901,-74.0073711,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2598ac19f1505:0xe91bd2f442592192!8m2!3d40.7199901!4d-74.0051824"><img (mouseover)="over()" (mouseleave)="out()" src="/Images/map.png"/></a> </div>
            <span class="footer-text right">30 6th Ave New York, NY</span>  
</div>`
                }), 
                __metadata('design:paramtypes', [core_5.Renderer, core_5.ApplicationRef])
            ], Footer);
            exports_5("Footer", Footer);
        }
    }
});
System.register("app/model/DeviceTypes", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var DeviceTypes;
    return {
        setters:[],
        execute: function() {
            (function (DeviceTypes) {
                DeviceTypes[DeviceTypes["Tablet"] = 1] = "Tablet";
                DeviceTypes[DeviceTypes["Phone"] = 2] = "Phone";
                DeviceTypes[DeviceTypes["Laptop"] = 3] = "Laptop";
            })(DeviceTypes || (DeviceTypes = {}));
            exports_6("DeviceTypes", DeviceTypes);
        }
    }
});
System.register("app/model/DeviceDisplayOffset", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var DeviceDisplayOffset;
    return {
        setters:[],
        execute: function() {
            DeviceDisplayOffset = class DeviceDisplayOffset {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                }
            };
            exports_7("DeviceDisplayOffset", DeviceDisplayOffset);
        }
    }
});
/**
 * Created by Mtui on 9/19/16.
 */
System.register("app/model/DeviceModels", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var DevicesModels;
    return {
        setters:[],
        execute: function() {
            (function (DevicesModels) {
                DevicesModels[DevicesModels["Apple"] = 0] = "Apple";
                DevicesModels[DevicesModels["Samsung"] = 1] = "Samsung";
                DevicesModels[DevicesModels["Motorola"] = 2] = "Motorola";
                DevicesModels[DevicesModels["HTC"] = 3] = "HTC";
                DevicesModels[DevicesModels["Nokia"] = 4] = "Nokia";
            })(DevicesModels || (DevicesModels = {}));
            exports_8("DevicesModels", DevicesModels);
        }
    }
});
System.register("app/model/Device", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Device;
    return {
        setters:[],
        execute: function() {
            Device = class Device {
                constructor(deviceType, deviceModel, condition, resourceUrl, iconOffset, name, names) {
                    this.deviceType = deviceType;
                    this.deviceModel = deviceModel;
                    this.condition = condition;
                    this.resourceUrl = resourceUrl;
                    this.iconOffset = iconOffset;
                    this.name = name;
                    this.names = names;
                }
                hasDeviceType(deviceType) {
                    return (deviceType === this.deviceType);
                }
            };
            exports_9("Device", Device);
        }
    }
});
System.register("app/model/UserDevice", ["app/model/Device"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Device_1;
    var UserDevice;
    return {
        setters:[
            function (Device_1_1) {
                Device_1 = Device_1_1;
            }],
        execute: function() {
            UserDevice = class UserDevice extends Device_1.Device {
                constructor() {
                    super(null, null, null, null, null, null, null);
                }
            };
            exports_10("UserDevice", UserDevice);
        }
    }
});
/**
 * Created by Mtui on 9/19/16.
 */
System.register("app/views/History", ['@angular/core', "app/model/UserDevice"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_6, UserDevice_1;
    var History;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (UserDevice_1_1) {
                UserDevice_1 = UserDevice_1_1;
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
                core_6.Component({
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
                }), 
                __metadata('design:paramtypes', [UserDevice_1.UserDevice])
            ], History);
            exports_11("History", History);
        }
    }
});
System.register("app/services/DeviceService", ["@angular/http", "@angular/core", "app/model/DeviceTypes", "app/model/DeviceModels", "app/model/Device"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var http_1, core_7, DeviceTypes_1, DeviceModels_1, Device_2;
    var DeviceService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (DeviceTypes_1_1) {
                DeviceTypes_1 = DeviceTypes_1_1;
            },
            function (DeviceModels_1_1) {
                DeviceModels_1 = DeviceModels_1_1;
            },
            function (Device_2_1) {
                Device_2 = Device_2_1;
            }],
        execute: function() {
            DeviceService = class DeviceService {
                constructor(http) {
                    this.http = http;
                    this.deviceData = [];
                    this.loadDevices();
                }
                getDevices() {
                    return this.deviceData;
                }
                loadDevices() {
                    this.http.get("/resource/resource.json")
                        .subscribe(data => {
                        this.populateDeviceData(data.json());
                    }, err => {
                        console.log(err);
                    }, () => console.log("done"));
                }
                getModel(d) {
                    var model;
                    switch (d.deviceModel) {
                        case DeviceModels_1.DevicesModels[DeviceModels_1.DevicesModels.Apple]:
                            model = DeviceModels_1.DevicesModels.Apple;
                            break;
                        case DeviceModels_1.DevicesModels[DeviceModels_1.DevicesModels.Samsung]:
                            model = DeviceModels_1.DevicesModels.Samsung;
                            break;
                    }
                    return model;
                }
                getType(d) {
                    var type;
                    switch (d.deviceType) {
                        case DeviceTypes_1.DeviceTypes[DeviceTypes_1.DeviceTypes.Phone]:
                            type = DeviceTypes_1.DeviceTypes.Phone;
                            break;
                        case DeviceTypes_1.DeviceTypes[DeviceTypes_1.DeviceTypes.Tablet]:
                            type = DeviceTypes_1.DeviceTypes.Tablet;
                            break;
                        case DeviceTypes_1.DeviceTypes[DeviceTypes_1.DeviceTypes.Laptop]:
                            type = DeviceTypes_1.DeviceTypes.Laptop;
                            break;
                    }
                    return type;
                }
                populateDeviceData(data) {
                    data.forEach(d => {
                        d.names.forEach(name => {
                            var imageName = name;
                            while (imageName.indexOf(" ") !== -1) {
                                imageName = imageName.replace(" ", "");
                            }
                            this.deviceData.push(new Device_2.Device(this.getType(d), this.getModel(d), null, (d.resourceUrl + "/" + imageName + ".jpg"), null, name, null));
                        });
                    });
                }
            };
            DeviceService = __decorate([
                core_7.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], DeviceService);
            exports_12("DeviceService", DeviceService);
        }
    }
});
System.register("app/utils/HasDeviceTypesPipe", ["@angular/core"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_8;
    var HasDeviceType;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            }],
        execute: function() {
            HasDeviceType = class HasDeviceType {
                transform(devices, deviceType) {
                    for (var i = 0; i < devices.length; i++) {
                        var d = devices[i];
                        if (d.deviceType === deviceType) {
                            return true;
                        }
                    }
                    return false;
                }
            };
            HasDeviceType = __decorate([
                core_8.Pipe({
                    name: "hasDeviceType"
                }), 
                __metadata('design:paramtypes', [])
            ], HasDeviceType);
            exports_13("HasDeviceType", HasDeviceType);
        }
    }
});
System.register("app/views/DeviceAttributes", ["@angular/core", "app/services/DeviceService", "app/model/UserDevice", "app/model/DeviceModels", "app/model/DeviceTypes", "@angular/router"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_9, DeviceService_1, UserDevice_2, DeviceModels_2, DeviceTypes_2, router_1;
    var MakeView;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (DeviceService_1_1) {
                DeviceService_1 = DeviceService_1_1;
            },
            function (UserDevice_2_1) {
                UserDevice_2 = UserDevice_2_1;
            },
            function (DeviceModels_2_1) {
                DeviceModels_2 = DeviceModels_2_1;
            },
            function (DeviceTypes_2_1) {
                DeviceTypes_2 = DeviceTypes_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                    this.userDevice.deviceType = DeviceTypes_2.DeviceTypes[event.target.name];
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
                    var model = DeviceModels_2.DevicesModels[button.name];
                    this.userDevice.deviceModel = model;
                    this.filteredModel = this.deviceData.filter(device => {
                        return device.deviceModel === model;
                    });
                }
            };
            MakeView = __decorate([
                core_9.Component({
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
                }), 
                __metadata('design:paramtypes', [DeviceService_1.DeviceService, UserDevice_2.UserDevice, router_1.Router])
            ], MakeView);
            exports_14("MakeView", MakeView);
        }
    }
});
System.register("app/views/DeviceDetails", ["@angular/core", "@angular/router", "app/model/UserDevice"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_10, router_2, UserDevice_3;
    var DeviceDetails;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (UserDevice_3_1) {
                UserDevice_3 = UserDevice_3_1;
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
                core_10.Component({
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
                }), 
                __metadata('design:paramtypes', [UserDevice_3.UserDevice, router_2.Router, core_10.ApplicationRef])
            ], DeviceDetails);
            exports_15("DeviceDetails", DeviceDetails);
        }
    }
});
System.register("app/model/ConditionType", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var ConditionType;
    return {
        setters:[],
        execute: function() {
            (function (ConditionType) {
                ConditionType[ConditionType["GOOD"] = 1] = "GOOD";
                ConditionType[ConditionType["BAD"] = 2] = "BAD";
                ConditionType[ConditionType["UGLY"] = 3] = "UGLY";
            })(ConditionType || (ConditionType = {}));
            exports_16("ConditionType", ConditionType);
        }
    }
});
System.register("app/views/GetPrice", ["@angular/core", "app/model/UserDevice"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_11, UserDevice_4;
    var GetPrice;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (UserDevice_4_1) {
                UserDevice_4 = UserDevice_4_1;
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
                core_11.Component({
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
                }), 
                __metadata('design:paramtypes', [UserDevice_4.UserDevice])
            ], GetPrice);
            exports_17("GetPrice", GetPrice);
        }
    }
});
/**
 * Created by Mtui on 9/18/16.
 */
System.register("app/app.routes", ["app/views/DeviceAttributes", "app/views/Entry", "app/views/DeviceDetails", "app/views/GetPrice"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var DeviceAttributes_1, Entry_1, DeviceDetails_1, GetPrice_1;
    var appRoutes, appRoutingProviders;
    return {
        setters:[
            function (DeviceAttributes_1_1) {
                DeviceAttributes_1 = DeviceAttributes_1_1;
            },
            function (Entry_1_1) {
                Entry_1 = Entry_1_1;
            },
            function (DeviceDetails_1_1) {
                DeviceDetails_1 = DeviceDetails_1_1;
            },
            function (GetPrice_1_1) {
                GetPrice_1 = GetPrice_1_1;
            }],
        execute: function() {
            exports_18("appRoutes", appRoutes = [
                { path: '', component: Entry_1.Entry },
                { path: "make", component: DeviceAttributes_1.MakeView },
                { path: "device-details", component: DeviceDetails_1.DeviceDetails, data: { s: "", x: "" } },
                { path: "final-price", component: GetPrice_1.GetPrice, data: { s: "", x: "" } },
            ]);
            exports_18("appRoutingProviders", appRoutingProviders = []);
        }
    }
});
System.register("app/app-module", ['@angular/core', '@angular/platform-browser', "app/app-component", "app/views/Nav", "app/views/MainView", "app/views/Footer", "app/app.routes", "app/views/Entry", "@angular/router", "app/views/DeviceAttributes", "app/views/History", "app/services/DeviceService", "@angular/http", "app/model/UserDevice", "ng2-responsive", "app/utils/HasDeviceTypesPipe", "app/views/DeviceDetails", "angular2-resizable", "app/views/GetPrice"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_12, platform_browser_1, app_component_1, Nav_1, MainView_1, Footer_1, app_routes_1, Entry_2, router_3, app_routes_2, DeviceAttributes_2, History_1, DeviceService_2, http_2, UserDevice_5, ng2_responsive_1, HasDeviceTypesPipe_1, DeviceDetails_2, angular2_resizable_1, GetPrice_2;
    var config, AppModule;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (Nav_1_1) {
                Nav_1 = Nav_1_1;
            },
            function (MainView_1_1) {
                MainView_1 = MainView_1_1;
            },
            function (Footer_1_1) {
                Footer_1 = Footer_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
                app_routes_2 = app_routes_1_1;
            },
            function (Entry_2_1) {
                Entry_2 = Entry_2_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (DeviceAttributes_2_1) {
                DeviceAttributes_2 = DeviceAttributes_2_1;
            },
            function (History_1_1) {
                History_1 = History_1_1;
            },
            function (DeviceService_2_1) {
                DeviceService_2 = DeviceService_2_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (UserDevice_5_1) {
                UserDevice_5 = UserDevice_5_1;
            },
            function (ng2_responsive_1_1) {
                ng2_responsive_1 = ng2_responsive_1_1;
            },
            function (HasDeviceTypesPipe_1_1) {
                HasDeviceTypesPipe_1 = HasDeviceTypesPipe_1_1;
            },
            function (DeviceDetails_2_1) {
                DeviceDetails_2 = DeviceDetails_2_1;
            },
            function (angular2_resizable_1_1) {
                angular2_resizable_1 = angular2_resizable_1_1;
            },
            function (GetPrice_2_1) {
                GetPrice_2 = GetPrice_2_1;
            }],
        execute: function() {
            config = {
                breakPoints: {
                    xs: { max: 600 },
                    sm: { min: 601, max: 959 },
                    md: { min: 960, max: 1279 },
                    lg: { min: 1280, max: 1919 },
                    xl: { min: 1920 }
                },
                debounceTime: 100 // allow to debounce checking timer
            };
            AppModule = class AppModule {
                constructor(_deviceService, _userDevice) {
                    this._deviceService = _deviceService;
                    this._userDevice = _userDevice;
                }
            };
            AppModule = __decorate([
                core_12.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        router_3.RouterModule.forRoot(app_routes_2.appRoutes),
                        http_2.HttpModule,
                        ng2_responsive_1.ResponsiveModule,
                        angular2_resizable_1.ResizableModule
                    ],
                    declarations: [
                        app_component_1.AppComponent,
                        Nav_1.TopNav,
                        MainView_1.MainView,
                        Footer_1.Footer,
                        Entry_2.Entry,
                        DeviceAttributes_2.MakeView,
                        History_1.History,
                        HasDeviceTypesPipe_1.HasDeviceType,
                        DeviceDetails_2.DeviceDetails,
                        GetPrice_2.GetPrice
                    ],
                    providers: [
                        app_routes_1.appRoutingProviders,
                        DeviceService_2.DeviceService,
                        UserDevice_5.UserDevice
                    ],
                    bootstrap: [app_component_1.AppComponent]
                }), 
                __metadata('design:paramtypes', [DeviceService_2.DeviceService, UserDevice_5.UserDevice])
            ], AppModule);
            exports_19("AppModule", AppModule);
        }
    }
});
System.register("app/main", ["@angular/platform-browser-dynamic", "app/app-module"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var platform_browser_dynamic_1, app_module_1;
    var platform;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }],
        execute: function() {
            //enableProdMode();
            platform = platform_browser_dynamic_1.platformBrowserDynamic();
            platform.bootstrapModule(app_module_1.AppModule);
        }
    }
});
System.register("app/model/Carrier", [], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var Carrier;
    return {
        setters:[],
        execute: function() {
            (function (Carrier) {
                Carrier[Carrier["ATT"] = 1] = "ATT";
                Carrier[Carrier["Sprint"] = 2] = "Sprint";
                Carrier[Carrier["Verizon"] = 3] = "Verizon";
                Carrier[Carrier["TMoblie"] = 4] = "TMoblie";
            })(Carrier || (Carrier = {}));
            exports_21("Carrier", Carrier);
        }
    }
});
/**
 * Created by Mtui on 9/19/16.
 */
System.register("app/RemoteResource/DeviceResource", [], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var data;
    return {
        setters:[],
        execute: function() {
            exports_22("data", data = {
                iPhone: {
                    url: "/Images/iphone/iphone.png",
                    name: [
                        "iPhone",
                        "iPhone 2",
                        "iPhone 3",
                        "iPhone 4",
                        "iPhone 4s",
                        "iPhone 5",
                        "iPhone 5s",
                        "iPhone 6"
                    ]
                },
                Samsung: {
                    url: "/Images/samsung/samsung.png",
                    name: [
                        "Samsung Galaxy S3",
                        "Samsung Galaxy S4",
                        "Samsung Galaxy S5"
                    ]
                }
            });
        }
    }
});
//# sourceMappingURL=bundle.js.map