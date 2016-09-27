/**
 * Created by Mtui on 9/27/16.
 */
var Nightmare = require("nightmare");
var mongoose     = require('mongoose');
var Device = require('./model/Device');

mongoose.connect('mongodb://localhost:27017/SellElectronics',function(err){
    if(err) throw err;
});
const URL = "https://www.gazelle.com/";
const deviceTypes = ["iphone", "tablets"];

var gazelle = new Nightmare()
    .viewport(1000,1000)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto(URL+"iphone/iphone-se/at-t/iphone-se-16gb-at-t/496141-gpid#Flawless")
    .wait(".clearfix h3")
    .evaluate(function() {
        return document.querySelector('.clearfix h3 span').innerHTML;
    })
    .end()
    .then(function (result) {

        console.log("Finding..");
        Device.find({
            deviceType: "phone",
            deviceManufactor: "Apple",
            deviceCondition: "GOOD",
            deviceMake: "iphoneSE"

        }, function(err, docs){
            if(err) throw err;
            if(docs.length > 0) {
                docs.forEach(function(device){
                    device.devicePrice = Math.round(parseInt(result) * 1.06);
                    device.save();
                    console.log("Saving Successful");
                });

            } else {
                var device  = new Device();
                device.deviceType =  "phone";
                device.deviceManufactor = "Apple"
                device.deviceCondition = "GOOD";
                device.deviceMake = "iphoneSE";
                device.devicePrice = parseInt(result);
                device.save(function(err){
                    if(err) throw err;
                    console.log("Saving successful: price"+price);

                } );
            }

        })
    })
    .catch(function(error){
        console.error('Search Failed');
    })



