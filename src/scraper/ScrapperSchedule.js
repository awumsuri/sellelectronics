"use strict";

var scheduler = require('node-schedule');
var exec;
var child;

function scrape(type){
    console.info("Scrape starting...");
    exec = require('child_process').spawn;
    child = exec('xvfb-run',['node', 'scraper.js', type]);
    child.stderr.on('data', function(data){
        console.info("data-error:"+data);
    });

    child.stdout.on('data', function(data){
        console.info("data:"+data);
    });

    child.on('close', function(data){
        console.info("data-close:"+data);
        killProcess();
	      copyResourceFile();
    });
}

function copyResourceFile() {
	exec = require("child_process").spawn;
	child = exec('cp', ['../resource/gazelleData.json', '/var/www/html/resource/']);
        child.stderr.on('data', function(data){
            console.info("data-error:"+data);
        });

        child.stdout.on('data', function(data){
            console.info("data:"+data);
        });

        child.on('close', function(data){
            console.info("data-close COPY COMPLETE:"+data);
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
    scheduler.scheduleJob("0 37 02 * * *", function(){
	    console.log("scraping updateMackbookPrices gazelle:"+new Date());
	    scrape("updateMacbookPrices");
    });
    scheduler.scheduleJob("0 00 05 * * *", function(){
      console.log("scraping updateMacbookProPrices gazelle:"+new Date());
      scrape("updateMacbookProPrices");
    });
    scheduler.scheduleJob("0 00 08 * * *", function(){
      console.log("scraping updateMacbookAirPrices gazelle:"+new Date());
      scrape("updateMacbookAirPrices");
    });
    scheduler.scheduleJob("0 00 11 * * *", function(){
      console.log("scraping updateiPhonePrices gazelle:"+new Date());
      scrape("updateiPhonePrices");
    });
    scheduler.scheduleJob("0 00 15 * * *", function(){
      console.log("scraping updateiPadPrices gazelle:"+new Date());
      scrape("updateiPadPrices");
    });
    scheduler.scheduleJob("0 00 20 * * *", function(){
      console.log("scraping updateSamsungPrices gazelle:"+new Date());
      scrape("updateSamsungPrices");
    });
}

initializeApplication();
