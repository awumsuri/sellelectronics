System.register(["./Device"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("UserDevice", UserDevice);
        }
    }
});

//# sourceMappingURL=UserDevice.js.map
