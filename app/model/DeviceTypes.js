System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DeviceTypes;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Mtui on 9/19/16.
             */
            (function (DeviceTypes) {
                DeviceTypes[DeviceTypes["Tablet"] = 1] = "Tablet";
                DeviceTypes[DeviceTypes["Phone"] = 2] = "Phone";
                DeviceTypes[DeviceTypes["Laptop"] = 3] = "Laptop";
            })(DeviceTypes || (DeviceTypes = {}));
            exports_1("DeviceTypes", DeviceTypes);
        }
    }
});

//# sourceMappingURL=DeviceTypes.js.map
