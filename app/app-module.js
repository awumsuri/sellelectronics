System.register(['@angular/core', '@angular/platform-browser', "./app-component", "./views/Nav", "./views/MainView", "./views/Footer", "./app.routes", "./views/Entry", "@angular/router", "./views/DeviceAttributes", "./views/History", "./services/DeviceService", "@angular/http", "./model/UserDevice", "ng2-responsive", "./utils/HasDeviceTypesPipe", "./views/DeviceDetails", "angular2-resizable", "./views/GetPrice"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, platform_browser_1, app_component_1, Nav_1, MainView_1, Footer_1, app_routes_1, Entry_1, router_1, app_routes_2, DeviceAttributes_1, History_1, DeviceService_1, http_1, UserDevice_1, ng2_responsive_1, HasDeviceTypesPipe_1, DeviceDetails_1, angular2_resizable_1, GetPrice_1;
    var config, AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (Entry_1_1) {
                Entry_1 = Entry_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (DeviceAttributes_1_1) {
                DeviceAttributes_1 = DeviceAttributes_1_1;
            },
            function (History_1_1) {
                History_1 = History_1_1;
            },
            function (DeviceService_1_1) {
                DeviceService_1 = DeviceService_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (UserDevice_1_1) {
                UserDevice_1 = UserDevice_1_1;
            },
            function (ng2_responsive_1_1) {
                ng2_responsive_1 = ng2_responsive_1_1;
            },
            function (HasDeviceTypesPipe_1_1) {
                HasDeviceTypesPipe_1 = HasDeviceTypesPipe_1_1;
            },
            function (DeviceDetails_1_1) {
                DeviceDetails_1 = DeviceDetails_1_1;
            },
            function (angular2_resizable_1_1) {
                angular2_resizable_1 = angular2_resizable_1_1;
            },
            function (GetPrice_1_1) {
                GetPrice_1 = GetPrice_1_1;
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
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        router_1.RouterModule.forRoot(app_routes_2.appRoutes),
                        http_1.HttpModule,
                        ng2_responsive_1.ResponsiveModule,
                        angular2_resizable_1.ResizableModule
                    ],
                    declarations: [
                        app_component_1.AppComponent,
                        Nav_1.TopNav,
                        MainView_1.MainView,
                        Footer_1.Footer,
                        Entry_1.Entry,
                        DeviceAttributes_1.MakeView,
                        History_1.History,
                        HasDeviceTypesPipe_1.HasDeviceType,
                        DeviceDetails_1.DeviceDetails,
                        GetPrice_1.GetPrice
                    ],
                    providers: [
                        app_routes_1.appRoutingProviders,
                        DeviceService_1.DeviceService,
                        UserDevice_1.UserDevice
                    ],
                    bootstrap: [app_component_1.AppComponent]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    }
});

//# sourceMappingURL=app-module.js.map
