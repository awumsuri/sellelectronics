/**
 * Created by Mtui on 9/27/16.
 */
var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var DeviceSchema    = new Schema({
    deviceType: String,
    deviceManufactor: String,
    deviceCondition: String,
    deviceCarrier: String,
    devicePrice: Number,
    deviceMake: String
});

module.exports  = mongoose.model("Device", DeviceSchema);