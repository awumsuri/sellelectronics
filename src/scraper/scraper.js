/**
 * Created by Mtui on 9/27/16.
 */
var Nightmare = require("nightmare");
var MongoClient	= require('mongodb').MongoClient;
var fs = require('fs');

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

const iPhoneGB = ["8GB", "16GB", "32GB", "64GB", "128GB"];
//const iPhoneGB = ["8GB"];
const iPhones = ["iphone-5c"];


const updateDeviceArray = [];

var complete = [];
var failed = [];
var url;
var index = 0;
var device;
var deviceTypesGazelle;
var DbRef = null;
var devices;

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

function gazelleFlawless(callback, callFn) {
    var gazelle =  Nightmare({
        waitTimeout: 15000
    });

    if(callFn && (callFn.indexOf("gazelleFlawless") !== -1) || !callFn) {
        gazelle.viewport(1000, 1000)
            .useragent(USER_AGENT)
            .goto(url)
            .wait(".clearfix h3")
            .click("li#perfect a")
            .wait(3000)
            .wait(".clearfix h3")
            .wait(10000)
            .evaluate(function () {
                var value = document.querySelector('.clearfix h3 span').innerHTML;
                return isNaN(value) ? 0 : value;
            })
            .end()
            .then(function (result) {
                console.log("price-flawless:" + result + " " + url + " index:" + index);
                complete.push("Found Flawless: " + url);
                var price = Math.round(parseInt(result) * 1.06);
                deviceTypesGazelle.update({
                    "id": device.id,
                    "name": device.name,
                    "carrier": device.carrier
                }, {$set: {"priceFlawless": price}}, function (err) {
                    if (err) throw err;
                    gazelleBrokenYes(callback, callFn)
                })
            })
            .catch(function (err) {
                console.error('Search flawless Failed Retrying' + err);

                gazelleFlawless(callback, callFn);
            });
    } else {
        console.log("Skipping Gazelle Flawless");
        complete.push("skipping gazelle Flawless");
        gazelleBrokenYes(callback, callFn);
    }
}

function gazelleBrokenYes(callback, callFn) {
    var gazelle =  Nightmare({
        waitTimeout: 25000
    })

    if(callFn && (callFn.indexOf("gazelleBrokenYes") !== -1) || !callFn) {
        gazelle.viewport(1000, 1000)
            .useragent(USER_AGENT)
            .goto(url)
            .wait(".clearfix h3")
            .click("li#poor a")
            .wait(2000)
            .wait("[data-api-name=yes]")
            .click("[data-api-name=yes]")
            .wait(3000)
            .wait(".clearfix h3")
            .evaluate(function () {
                var value = document.querySelector('.clearfix h3 span').innerHTML;
                return isNaN(value) ? "0" : value;
            })
            .end()
            .then(function (result) {

                console.log("price-broken-yes:" + result + " " + url + " index:" + index);
                var price = Math.round(parseInt(result) * 1.06);
                complete.push("Found Broken Yes: " + url);
                deviceTypesGazelle.update({
                    "id": device.id,
                    "name": device.name,
                    "carrier": device.carrier
                }, {$set: {"pricebrokenYes": price}}, function (err) {
                    if (err) throw err;
                    gazelleBrokenNo(callback, callFn)

                });
            })
            .catch(function (error) {
                console.error('Search Failed Broken Yes');
                gazelleBrokenYes(callback, callFn)
            });
    }  else {
        console.log("Skipping GazelleBrokenYes");
        complete.push("skipping gazelle good");
        gazelleBrokenNo(callback, callFn);
    }
}

function gazelleBrokenNo(callback, callFn) {
    var gazelle =  Nightmare({
        waitTimeout: 25000
    })
    if(callFn && (callFn.indexOf("gazelleBrokenNo") !== -1) || !callFn) {
        gazelle.viewport(1000, 1000)
            .useragent(USER_AGENT)
            .goto(url)
            .wait(".clearfix h3")
            .click("li#poor a")
            .wait(2000)
            .wait("[data-api-name=no]")
            .click("[data-api-name=no]")
            .wait(10000)
            .wait(".clearfix h3")
            .evaluate(function () {
                var value = document.querySelector('.clearfix h3 span').innerHTML;
                return isNaN(value) ? "0" : value;
            })
            .end()
            .then(function (result) {
                console.log("price-broken-no:" + result + " " + url + " index:" + index);
                complete.push("Found Broken Price No: " + url);
                var price = Math.round(parseInt(result) * 1.06);
                deviceTypesGazelle.update({
                    "id": device.id,
                    "name": device.name,
                    "carrier": device.carrier
                }, {$set: {"pricebrokenNo": price}}, function (err) {
                    if (err) throw err;
                    pushNext(callback, callFn);
                });

            })
            .catch(function (error) {
                console.error('Search Failed Retrying .....' + error + " \n" + url);
                gazelleBrokenNo(callback, callFn);
            });
    } else {
        console.log("Skipping GazelleBroken No");
        complete.push("skipping gazelle no");
        pushNext(callback, callFn);
    }
}

function gazelleGood(callback, callFn) {

    var gazelleGood = Nightmare({
        waitTimeout: 20000
    });
    if(callFn && (callFn.indexOf("gazelleGood") !== -1) || !callFn) {
        console.log("Starting Good Price");
        gazelleGood.viewport(1000, 1000)
            .useragent(USER_AGENT)
            .goto(url)
            .wait(".clearfix h3")
            .wait(10000)
            .evaluate(function () {
                var value = document.querySelector('.clearfix h3 span').innerHTML;
                return isNaN(value) ? 0 : value;
            })
            .then(function (result) {
                console.log("Found good:"+result+url+" index:"+index);
                var price = Math.round(parseInt(result) * 1.06);
                complete.push("Found Good: "+url);
                deviceTypesGazelle.update({
                    "id": device.id,
                    "name": device.name,
                    "carrier": device.carrier
                }, {$set: {"priceGood": price}}, function (err) {
                    if (err) throw err;
                    gazelleFlawless(callback, callFn);
                })
            })
            .catch(function(err){
                console.error('Search good Failed Retrying...'+err);
                gazelleGood(callback, callFn);
            });

    } else {
        console.log("Skipping GazelleGood");
        complete.push("skipping gazelle good");
        gazelleFlawless(callback, callFn);
    }

}

function pushNext(callback, callFn) {
    if((complete.length + failed.length) >= 4) {
        var jDevice = JSON.stringify(devices);
        fs.writeFile("../resource/gazelleData.json", jDevice, function (err) {
            if (err) throw err;
        });
        index++;
        if(callback)
            callback(null, callback, callFn);
        else
            updatePrices();

    }
    else {
        console.error("completed"+(complete.length + failed.length) + ": "+failed);
        setTimeout(pushNext, 1000);
    }
}

function updatePrices() {

    if(!devices) {
        MongoClient.connect(DB_URL,function(err, db) {
            if(err) throw err;

            DbRef = db;
            deviceTypesGazelle = db.collection("deviceTypes");
            deviceTypesGazelle.find({}).toArray( function (err, devicesL) {
                if (err) throw err;
                devices = devicesL;
                console.log("devices count:" + devices.length);
                if (index < devices.length) {
                    device = devices[index];
                    url = URL + "iphone/" + device.make
                        + "/" + device.carrier + "/"
                        + device.make + "-" + device.size
                        + "-" + device.carrier + "/"
                        + device.id + "-gpid";
                    gazelleGood();
                }
            });
        })
    } else {
        if (index < devices.length) {
            device = devices[index];
            url = URL + "iphone/" + device.make
                + "/" + device.carrier + "/"
                + device.make + "-" + device.size
                + "-" + device.carrier + "/"
                + device.id + "-gpid";
            gazelleGood(callback);
        } else {
            DbRef.close(function(err) {
                if(err) throw  err;
                console.log("DB.CLOSED!");
                process.exit();

            });
        }
    }
}

function updateSelected(query, callback, callFn) {
    if (!devices) {
        MongoClient.connect(DB_URL,function(err, db) {
            if(err) throw err;

            DbRef = db;
            deviceTypesGazelle = db.collection("deviceTypes");
            deviceTypesGazelle.find(query).toArray( function (err, devicesL) {
                if (err) throw err;
                devices = devicesL;
                console.log("devices count:" + devices.length);
                if (index < devices.length) {
                    device = devices[index];
                    url = URL + "iphone/" + device.make
                        + "/" + device.carrier + "/"
                        + device.make + "-" + device.size
                        + "-" + device.carrier + "/"
                        + device.id + "-gpid";
                    gazelleGood(callback, callFn);
                }
            });
        })
    } else {
        if (index < devices.length) {
            device = devices[index];
            url = URL + "iphone/" + device.make
                + "/" + device.carrier + "/"
                + device.make + "-" + device.size
                + "-" + device.carrier + "/"
                + device.id + "-gpid";
            gazelleGood(callback, callFn);
        } else {
            DbRef.close(function(err) {
                if(err) throw  err;
                console.log("DB.CLOSED!");
                process.exit();
            });
        }
    }

}

function saveData() {
    MongoClient.connect(DB_URL,function(err, db) {
        if(err) throw err;

        DbRef = db;
        deviceTypesGazelle = db.collection("deviceTypes");
        deviceTypesGazelle.find({}).toArray( function (err, devices) {
            if (err) throw err;
            var jDevice = JSON.stringify(devices);
            fs.writeFile("../resource/gazelleData.json", jDevice, function (err) {
                if (err) throw err;
                console.log("Data Saved Successfully!");
                db.close(function(err){
                    if(err) throw err;
                    console.log("DB CLOSED!");
                    process.exit();
                })
            });

        })
    })
}


switch(process.argv[2]) {
    case "updatePrices":
        updatePrices();
        break;
    case "saveData":
        saveData();
        break;
  case "updateSelected":
        var query = {
            "$where": process.argv[3]
        };
        var allowedFunction = process.argv[4];
        if(!allowedFunction)
          allowedFunction = "gazelleGood:gazelleFlawless:gazelleBrokenYes:gazelleBrokenNo";
        var allow = allowedFunction.split(":");
        updateSelected(query, updateSelected, allow);
        break;
    default:
        process.argv.forEach(function (val, index, array) {
            console.log(index + ': ' + val);
        });
        console.log("\nParameters: saveData, updateSelected, updatePrices")
        break;
}







