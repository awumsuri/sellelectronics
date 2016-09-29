/**
 * Created by Mtui on 9/27/16.
 */
var Nightmare = require("nightmare");
var mongoose     = require('mongoose');
var Device = require('./model/Device');
var DeviceType = require('./model/DeviceType');
var MongoClient	= require('mongodb').MongoClient;
var fs = require('fs');

mongoose.connect('mongodb://localhost:27017/SellElectronics',function(err){
    if(err) throw err;
});
const DB_URL = 'mongodb://localhost:27017/SellElectronics';
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36";

const URL = "https://www.gazelle.com/";
const deviceTypes = ["iphone", "cell-phone","tablet"];
const deviceCondition = ["GOOD", "BAD", "UGLY"];
const deviceCarriers = ["at-t", "sprint", "t-mobile", "verizon", "unlocked"];
/*const iPhones = [
                "iphone-se",
                "iphone-6s-plus",
                "iphone-6s",
                "iphone-6-plus",
                "iphone-6",
                "iphone-5s",
                "iphone-5",
                "iphone-5c"
            ];*/
const iPhones = ["iphone-se"];
const deviceCarriers = ["at-t", "sprint", "t-mobile", "verizon", "unlocked"];]
const iPhoneGB = ["16GB", "32GB", "64GB", "128GB"];
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

function updatePrices() {

    MongoClient.connect(DB_URL,function(err, db) {

        if(err) throw err;
        var deviceTypes = db.collection("deviceTypes");

        deviceTypes.find({}).toArray( function (err, devices) {

            if (err) throw err;
            console.log("devices count:" + devices.length);

            var runNext = function (index) {
                if (index < devices.length) {
                    var device = devices[index];
                    var gazelle = new Nightmare()
                        .viewport(1000, 1000)
                        .useragent(USER_AGENT)
                        .goto(URL + "iphone/" + device.make
                            + "/" + device.carrier + "/"
                            + device.make + "-" + device.size
                            + "-" + device.carrier + "/"
                            + device.id + "-gpid")
                        .wait(".clearfix h3")
                        .evaluate(function () {
                            return document.querySelector('.clearfix h3 span').innerHTML;
                        })
                        .end()
                        .then(function (result) {
                            console.log("price:" + result);
                            var price = Math.round(parseInt(result) * 1.06);
                            deviceTypes.update({"id": device.id, "name": device.name, "carrier": device.carrier}, {$set:{"price": price}}, function(err){
                                if(err) throw err;
                                var jDevice = JSON.stringify(devices);
                                fs.writeFile("../resource/gazelleData.json", jDevice, function(err){
                                    if(err) throw err;

                                });

                                runNext(index + 1);
                            } );
                        })
                        .catch(function (error) {
                            console.error('Search Failed');
                        });
                } else {
                   // db.close();
                   // exit();
                }
            }
            runNext(0);
        });
    })
}

updatePrices();






