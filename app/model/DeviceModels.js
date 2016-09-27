/**
 * Created by Mtui on 9/19/16.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("DevicesModels", DevicesModels);
        }
    }
});

//# sourceMappingURL=DeviceModels.js.map
