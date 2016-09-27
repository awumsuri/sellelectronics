System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Carrier;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Mtui on 9/24/16.
             */
            (function (Carrier) {
                Carrier[Carrier["ATT"] = 1] = "ATT";
                Carrier[Carrier["Sprint"] = 2] = "Sprint";
                Carrier[Carrier["Verizon"] = 3] = "Verizon";
                Carrier[Carrier["TMoblie"] = 4] = "TMoblie";
            })(Carrier || (Carrier = {}));
            exports_1("Carrier", Carrier);
        }
    }
});

//# sourceMappingURL=Carrier.js.map
