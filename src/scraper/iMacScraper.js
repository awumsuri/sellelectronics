"use strict";

var Nightmare = require("nightmare");
var MongoClient	= require('mongodb').MongoClient;
var fs = require('fs');

const DB_URL = 'mongodb://localhost:27017/SellElectronics';

var URL = null;
var TYPE = null;
var DBRef = null;
var MAKE = null;

var devices = [];

const iMAC = [
  "2-00-ghz", "2-26-ghz",
  "2-40-ghz", "2-50-ghz", "2-66-ghz", "2-70-ghz",
  "2-80-ghz", "2-90-ghz", "2-93-ghz", "3-06-ghz",
  "3-10-ghz", "3-20-ghz", "3-33-ghz", "3-4-ghz",
  "3-40-ghz", "3-50-ghz", "3-60-ghz", "4-00-ghz"
];

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36";

function scrape(url, macbook, ref) {

  var scraper = new Nightmare({
    waitTimeout: 20000,
    gotoTimeout: 3000
  });

  console.log("url:"+url);
  scraper.viewport(1000, 1000)
    .useragent(USER_AGENT)
    .goto(url)
    .wait(4000)
    .evaluate(function() {
      var li = $('.main_stack.product_stack').find('[data-id]');
      return Array.prototype.map.call(li, function(value){
        return {
          "id": value.getAttribute("data-id"),
          "name": value.querySelector("h4").innerHTML
        }
      });
    })
    .end()
    .then(function(result){
      result.forEach(function (r) {
        var mac = {};
        mac.id = r.id;
        mac.name = r.name;
        mac.make = MAKE;
        console.log("macbook:"+mac.toString());
        save(mac);
        scrapeInit(ref);
      });
    })
    .catch(function (err) {
      console.error(err);
      scrapeInit(ref);
    });
}

function scrapePopulateDevices() {
 scrapeInit(null);
}

function scrapeInit(ref) {

  if(ref)
    ref = null;

  if(devices.length != 0) {
    var device = devices[0];
    console.log("scrapeInit id:"+device.macbook.year);
    console.log("remaing devices:"+devices.length);

    var s = new scrape(device.url, device.macbook, s);
    devices.shift();
  } else {
    console.log("COMPLETE! Scrape");
  }
}

function init() {
  var processors = iMAC;

  for (var k = 0; k < processors.length; k++) {
    var macbook = {};
    macbook.processor = processors[k];
    var url = "https://www.gazelle.com" + URL + "/" + macbook.processor;
    devices.push({
      url: url,
      macbook: macbook
    });

  }
  scrapePopulateDevices();
}

function save(data, closeDB) {

  if(!DBRef) {
    MongoClient.connect(DB_URL,function(err, db){
      if(err) throw err;
      console.info('connected to database saving data:'+data);
      DBRef = db;
      saveToMongo(data);

    });
  } else {
    saveToMongo(data);
  }
}

function saveToMongo(data) {
  var deviceTypes = DBRef.collection('deviceTypes');

  console.log("data.id:"+data.id + " data.name:"+data.name);

  deviceTypes.find({"id":data.id,"name":data.name}).count(function(err, count) {
    if(err) throw err;

    console.log("new device:"+count === 0);

    if(count === 0){
      deviceTypes.insertOne(data, function(err){
        if(err) throw err;
        console.log("inserted:"+data.name);
      });
    } else {
      console.log(data.name + " is already in DB")
    }
  });
}

switch(process.argv[2]) {
  case "imac":
    URL = "/sell/mac/imac";
    TYPE = iMAC;
    MAKE = "imac";
    init();
    break;
  default:
    throw new Error("No type found");
}



