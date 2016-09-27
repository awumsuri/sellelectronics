System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConditionType;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Mtui on 9/24/16.
             */
            (function (ConditionType) {
                ConditionType[ConditionType["GOOD"] = 1] = "GOOD";
                ConditionType[ConditionType["BAD"] = 2] = "BAD";
                ConditionType[ConditionType["UGLY"] = 3] = "UGLY";
            })(ConditionType || (ConditionType = {}));
            exports_1("ConditionType", ConditionType);
        }
    }
});

//# sourceMappingURL=ConditionType.js.map
