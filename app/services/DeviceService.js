System.register(["@angular/core", "../model/DeviceTypes", "../model/DeviceModels", "../model/Device"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, DeviceTypes_1, DeviceModels_1, Device_1;
    var DeviceService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DeviceTypes_1_1) {
                DeviceTypes_1 = DeviceTypes_1_1;
            },
            function (DeviceModels_1_1) {
                DeviceModels_1 = DeviceModels_1_1;
            },
            function (Device_1_1) {
                Device_1 = Device_1_1;
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
                            this.deviceData.push(new Device_1.Device(this.getType(d), this.getModel(d), null, (d.resourceUrl + "/" + imageName + ".jpg"), null, name, null));
                        });
                    });
                }
            };
            DeviceService = __decorate([
                core_1.Injectable()
            ], DeviceService);
            exports_1("DeviceService", DeviceService);
        }
    }
});

//# sourceMappingURL=DeviceService.js.map
