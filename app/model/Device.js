System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("Device", Device);
        }
    }
});

//# sourceMappingURL=Device.js.map
