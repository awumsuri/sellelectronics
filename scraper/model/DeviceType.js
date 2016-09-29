/**
 * Created by Mtui on 9/28/16.
 */
/**
 * Created by Mtui on 9/27/16.
 */
var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var DeviceSchema    = new Schema({
    deviceName: String,
    deviceCarrier: String,
    deviceID: String
});

module.exports  = mongoose.model("DeviceType", DeviceSchema);
