"use strict";
var Device = (function () {
    function Device(deviceType, deviceModel, condition, resourceUrl, iconOffset, name, names) {
        this.deviceType = deviceType;
        this.deviceModel = deviceModel;
        this.condition = condition;
        this.resourceUrl = resourceUrl;
        this.iconOffset = iconOffset;
        this.name = name;
        this.names = names;
    }
    Device.prototype.hasDeviceType = function (deviceType) {
        return (deviceType === this.deviceType);
    };
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=Device.js.map