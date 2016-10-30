"use strict";

var Nightmare = require("nightmare");
var MongoClient	= require('mongodb').MongoClient;
var fs = require('fs');

const DB_URL = 'mongodb://localhost:27017/SellElectronics';
var DBRef = null;
var macbooks = [];

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
     /*{
       size:"13",
       processors: [
       "1-83-ghz",
       "2-0-ghz",
       "2-10-ghz",
       "2-13-ghz",
       "2-16-ghz",
       "2-20-ghz",
       "2-26-ghz",
       "2-40-ghz"
       ],
       year: [
       "early-2009",
       "late-2006",
       "late-2007",
       "late-2008",
       "mid-2006",
       "mid-2006"
     ]
     }*/
  ]

};

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36";

function scrape(url, macbook) {
  var scraper = Nightmare({
    waitTimeout: 200000
  });
  console.log("url:"+url);
  console.log("value:"+macbook);

  var value = "/sell/macbook/macbook" + "/" + macbook.size + "/" + macbook.processor + "/" + macbook.year;

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
    .then(function(result){

      macbook.id = result.id;
      macbook.name = result.name;
      macbook.make = "macbook";
      console.log("macbook:"+macbook.toString());

      save(macbook);

      scraper = null;
    })
    .catch(function (err) {
      console.error(err);
      scraper = null;
    });
}

function init() {
  var screens = MACBOOK.screen;

  for(var i = 0; i < screens.length; i++ ) {

    var macbook = {};

    var screen = screens[i];
    var years = screen.year;
    console.log("years:" + years);

    for (var j = 0; j < years.length; j++) {

      macbook.year = years[j];
      macbook.size = screen.size;
      var processors = screen.processors;
      for (var k = 0; k < processors.length; k++) {
        macbook.processor = processors[k];
        var url = "https://www.gazelle.com/sell/macbook/macbook" + "/" + macbook.size + "/" + macbook.processor;

        //var url = URL + getURL(value);
        scrape(url, macbook);
      }
    }
  }
}


function save(data, closeDB) {

  if(!DBRef) {
    MongoClient.connect(DB_URL,function(err, db){
      if(err) throw err;
      console.info('connected to database saving phone data:'+data);
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
    }
  });
}
init();



