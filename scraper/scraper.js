/**
 * Created by Mtui on 9/27/16.
 */
var Nightmare = require("nightmare");
var mongoose     = require('mongoose');
var Device = require('./model/Device');
var DeviceType = require('./model/DeviceType');

mongoose.connect('mongodb://localhost:27017/SellElectronics',function(err){
    if(err) throw err;
});
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36";

const URL = "https://www.gazelle.com/";
const deviceTypes = ["iphone", "cell-phone","tablet"];
const deviceCondition = ["GOOD", "BAD", "UGLY"];
const deviceCarriers = ["at-t", "sprint", "t-mobile", "verizon", "unlocked"];
const iPhones = [
                "iphone-se",
                "iphone-6s-plus",
                "iphone-6s",
                "iphone-6-plus",
                "iphone-6",
                "iphone-5s",
                "iphone-5",
                "iphone-5c"
            ];
const iPhoneGB = ["16gb", "32gb", "64gb"];
const updateDeviceArray = [];

function generateIphoneURLS() {
    var url = URL+"iphone/";
    iPhones.forEach(function(iphone){
        for(var i = 0; i  < iPhoneGB.length; i++) {
            for (var j = 0; j < deviceCarriers.length; j++) {
                var u = url + iphone + "/" + deviceCarriers[j] + "/" + iphone + "-" + iPhoneGB[i] + "-" +deviceCarriers[j]  + "/495189-gpid";
                console.log(u);
                updateDeviceArray.push(u);
            }
        }

    })
}

function getGazelleIPhoneID(iphone, carrier) {

    var gazelle = new Nightmare()
        .viewport(1000,1000)
        .useragent(USER_AGENT)
        .goto(URL+"iphone/"+iphone+"/"+carrier+"/")
        .wait(".main_stack")
        .evaluate(function(){
            var a =  $(".main_stack.product_stack").find("[data-id]");
            return a;
            var newO = [];
            a.forEach(function(value){
                var o = {};
                o.id = value.getAttribute("data-id");
                o.name = value.querySelector("h4").innerHTML;
                newO.push(o);
            })

            return newO;
        })
        .end()
        .then(function(result){
            console.log("result"+result.toString());
           DeviceType.find({
               deviceName: iphone,
               deviceCarrier: carrier
           }, function(err, devices){
               if(err) throw err;
               if(devices.length > 0) {
                   devices.forEach(function(device){
                       //deviceID = result
                   })
               }
           })
        })
        .catch(function(error){
            console.log("Failed!!!");
        })

}


function updateprice(mappedDevice){
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
                        console.log("Saving Successful new price:" + device.devicePrice);
                    });

                } else {
                    var device  = new Device();
                    device.deviceType =  mappedDevice.deviceType;
                    device.deviceManufactor = mappedDevice.deviceManufactor;
                    device.deviceCondition = mappedDevice.deviceCondition;
                    device.deviceMake = mappedDevice.deviceMake;
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

}
getGazelleIPhoneID("iphone-6", "at-t");
//generateIphoneURLS();






