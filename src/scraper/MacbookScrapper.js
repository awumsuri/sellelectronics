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

const MAX_CONCURRENT = 10;
const FULL_YEARS = [
  "mid-2006",
  "early-2006",
  "late-2006",
  "mid-2007",
  "early-2007",
  "late-2007",
  "mid-2008",
  "early-2008",
  "late-2008",
  "mid-2009",
  "early-2009",
  "late-2009",
  "mid-2010",
  "late-2010",
  "mid-2010",
  "early-2011",
  "mid-2011",
  "late-2011",
  "early-2012",
  "mid-2012",
  "late-2012",
  "early-2013",
  "mid-2013",
  "late-2013",
  "early-2014",
  "mid-2014",
  "late-2014",
  "early-2015",
  "mid-2015",
  "late-2015"
]
const MACBOOK = {
  screen: [
    {
      size: "12",
      processors: [
        "1-10-ghz",
        "1-20-ghz",
        "1-30-ghz"
      ],
      year: [
        "early-2015"
      ]
    },
     {
       size:"13",
       processors: [
       "1-83-ghz",
       "2-0-ghz",
       "2-1-ghz",
       "2-13-ghz",
       "2-16-ghz",
       "2-20-ghz",
       "2-26-ghz",
       "2-40-ghz"
       ],
       year:FULL_YEARS
     }
  ]
};

const MACBOOK_AIR = {
  screen: [
    {
     size: "11",
     processors: [
       "1-30-ghz",
       "1-40-ghz",
       "1-60-ghz",
       "1-70-ghz",
       "1-80-ghz",
       "2-0-ghz",
       "2-20-ghz"
     ],
     year: FULL_YEARS
     },
    {
      size:"13",
      processors: [
        "1-30-ghz",
         "1-40-ghz",
        "1-60-ghz",
         "1-70-ghz",
         "1-80-ghz",
         "1-86-ghz",
         "2-0-ghz",
         "2-13-ghz",
        "2-20-ghz"
      ],
      year: FULL_YEARS
    }
  ]
}

const MACBOOK_PRO = {
  screen: [
    {
      size: "13",
      processors: [
         "2-26-ghz",
         "2-30-ghz",
         "2-40-ghz",
         "2-5-ghz",
         "2-53-ghz",
         "2-60-ghz",
         "2-66-ghz",
          "2-70-ghz",
          "2-80-ghz",
          "2-90-ghz",
          "3-00-ghz",
          "3-0ghz",
          "3-10-ghz"
      ],
      year: FULL_YEARS
    },
    {
      size:"15",
      processors: [
          "1-67-ghz",
          "1-83-ghz",
          "2-0-ghz",
          "2-16-ghz",
          "2-20-ghz",
          "2-30-ghz",
          "2-33-ghz",
          "2-40-ghz",
          "2-5-ghz",
          "2-53-ghz",
          "2-60-ghz",
          "2-66-ghz",
          "2-70-ghz",
          "2-80-ghz",
          "2-93-ghz",
          "3-06-ghz"
      ],
      year: FULL_YEARS
    }
  ]
}

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36";

function scrape(url, macbook, ref) {
  var scraper = new Nightmare({
    waitTimeout: 3000,
    gotoTimeout: 2000
  });

  console.log("url:"+url);

  var value = URL + "/" + macbook.size + "/" + macbook.processor + "/" + macbook.year;
  console.log("value:"+value);
  scraper.viewport(1000, 1000)
    .useragent(USER_AGENT)
    .goto(url)
    .wait("#year option")
    .select("option", value)
    .wait("#back_button")
    .evaluate(function() {
        var a = $("#back_button")[0].href.split("/");
        var id = a[a.length - 1].split("-")[0];
        var name = a[9];
        name = name.split("-").join(" ");

        return {
          "id": id,
          "name": name
        }
    })
    .end()
    .then(function(result) {
      macbook.id = result.id;
      macbook.name = result.name;
      macbook.make = MAKE;
      console.log("macbook:"+macbook.toString());

      save(macbook);
      scrapeInit(ref);
    })
    .catch(function (err) {
      console.error(err);
      scrapeInit();
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
      var s = new scrape(device.url, device.macbook, s);
      console.log("scrapeInit id:"+device.macbook.year+ "\n" + "remaing devices:"+devices.length);

      devices.shift();
  } else {
    console.log("COMPLETE! Scrape")
  }
}

function init() {
  var screens = TYPE.screen;
  for(var i = 0; i < screens.length; i++ ) {

    var screen = screens[i];
    var years = screen.year;
    console.log("years:" + years);

    for (var j = 0; j < years.length; j++) {
      var processors = screen.processors;
      for (var k = 0; k < processors.length; k++) {
        var macbook = {};

        macbook.year = years[j];
        macbook.size = screen.size;
        macbook.processor = processors[k];

        var url = "https://www.gazelle.com" + URL + "/" + macbook.size + "/" + macbook.processor;

        devices.push({
          url: url,
          macbook: macbook
        });
      }
    }
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
  case "macbook":
    URL = "/sell/macbook/macbook";
    TYPE = MACBOOK;
    MAKE = "macbook";
    init();
    break;
  case "macbook-air":
    URL = "/sell/macbook/macbook-air";
    TYPE = MACBOOK_AIR;
    MAKE = "macbook-air";
    init();
    break;
  case "macbook-pro":
    URL = "/sell/macbook/macbook-pro";
    TYPE = MACBOOK_PRO;
    MAKE = "macbook-pro";
    init();
    break;
  default:
        throw new Error("No type found");
}
