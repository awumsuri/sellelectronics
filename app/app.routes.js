/**
 * Created by Mtui on 9/18/16.
 */
System.register(["./views/DeviceAttributes", "./views/Entry", "./views/DeviceDetails", "./views/GetPrice"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("appRoutes", appRoutes = [
                { path: '', component: Entry_1.Entry },
                { path: "make", component: DeviceAttributes_1.MakeView },
                { path: "device-details", component: DeviceDetails_1.DeviceDetails, data: { s: "", x: "" } },
                { path: "final-price", component: GetPrice_1.GetPrice, data: { s: "", x: "" } },
            ]);
            exports_1("appRoutingProviders", appRoutingProviders = []);
        }
    }
});

//# sourceMappingURL=app.routes.js.map
