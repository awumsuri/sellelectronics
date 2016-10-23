/**
 * Created by Mtui on 9/28/16.
 */

var request = require('request');
var fs  = require('fs');
var Reminder = require("reminder");
var scheduler   = require('node-schedule');
var MongoClient	= require('mongodb').MongoClient;
var DB_URL = 'mongodb://localhost:27017/SellElectronics';

var DBRef;
var child;
var exec;
var index = 0;

function scrape(){
    console.info("Scraper starting...");
    exec = require('child_process').spawn;
    child = exec('casperjs',['ScraperCasper.js']);
    child.stderr.on('data', function(data){
        console.error("data-error:"+data);
    });

    child.stdout.on('data', function(data){
        console.info("data:"+data);
        if(data.indexOf("Connected to server") !== -1 )
            getIDs();
    });

    child.on('close', function(data){
        console.info("data-close:"+data);
    });
}

function getIDs() {
    var req     = request('http://127.0.0.1:8003', {timeout: 9999999}, function(err, res, body) {
      var data;
      if (err) {
        throw err;
        return;
      }
      try {
        data = JSON.parse(body);
        saveData(data);
        killProcess();
      } catch (e) {
        console.error("Error in wrapper service:" + err + " data:" + data);
      }
    });
}

function saveData(data){
    MongoClient.connect(DB_URL,function(err, db){
        if(err) throw err;
        console.info('connected to database saving phone data:'+data.length);
        var deviceTypes = db.collection('deviceTypes');
        DBRef = db;
        Array.prototype.forEach.call(data, function(event){
            console.log("event:"+event.id + " event:"+event.name);
            deviceTypes.find({"id":event.id,"name":event.name}).count(function(e, count){
                if(e) throw e;
                console.log("new device:"+count === 0);
                if(count === 0){
                    deviceTypes.insertOne(event, function(err){
                        if(err) throw err;
                    });
                }
            });

        });
    });
}

function killProcess(){
    child.stderr.unpipe();
    child.stdout.unpipe();
    child.stdout.unref();
    child.stderr.unref();
    child.removeAllListeners('data');
    child.kill();
    child = null;
    delete child;
    exec = null;
    delete exec;
}

function closeDB(){
    if(DBRef){
        DBRef.close(function(err){
            console.info("err:"+err);
            if (err) throw err;
        });
        console.info("DB Closed");
    }
}

scrape();

