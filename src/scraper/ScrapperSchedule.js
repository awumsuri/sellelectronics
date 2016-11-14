"use strict";

var scheduler = require('node-schedule');
var exec;
var child;

function scrape(type){
    console.info("Scrape starting...");
    exec = require('child_process').spawn;
    child = exec('node',['scraper.js', type]);
    child.stderr.on('data', function(data){
        console.info("data-error:"+data);
    });

    child.stdout.on('data', function(data){
        console.info("data:"+data);
    });

    child.on('close', function(data){
        console.info("data-close:"+data);
        killProcess();
    });
}

function killProcess(){
	if(child) {
		child.stderr.unpipe();
		child.stdout.unpipe();
		child.stdout.unref();
		child.stderr.unref();
		child.removeAllListeners('data');
		child.kill();
		child = null;
		exec = null;
    console.log("processes killed")
	}
}

function initializeApplication(){
    var rule = new scheduler.RecurrenceRule();
    rule.hour = 5;
    rule.minute = 1;
    scheduler.scheduleJob("0 28 19 * * *", function(){
	    console.log("scraping gazelle:"+new Date());
	    scrape("updateMacbookPrices");
    });
    scheduler.scheduleJob("0 30 19 * * *", function(){
      console.log("scraping gazelle:"+new Date());
      scrape("updateMacbookProPrices");
    });
}

initializeApplication();
