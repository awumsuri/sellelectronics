/**
 * Created by Mtui on 9/28/16.
 */
"use-strict";
var ip = "127.0.0.1:8003";

var server = require('webserver').create();
server.timeout = 9999999;
server.listen(ip, function(req, res){
    const CARRIERS = ["at-t", "sprint", "verizon", "t-mobile","unlocked"];
    const iPAD_CARRIERS = [
      "unlocked",
      "wifi",
      "at-t",
      "sprint",
      "verizon",
      "t-mobile",
      "unlocked"
    ];

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

    const iPAD_CATAGORY = [
      {
        "ipad-pro": [
        "ipad-pro"
      ]},
      {
        "ipad-mini": [
        "ipad-mini",
        "ipad-mini2",
        "ipad-mini3",
        "ipad-mini4"
      ]},
      {
        "ipad-air": [
        "1st-gen",
        "2nd-gen"
      ]},
      {
        "ipad": [
        "1st-gen",
        "2nd-gen",
        "3st-gen",
        "4nd-gen"
      ]}
    ];

    const iPhoneSize = ["8GB","16GB", "32GB", "64GB", "128GB"];
    const iPadSize = ["16GB", "32GB", "64GB", "128GB", "256GB"];

    var index = 0;
    var carrierIndex = 0;

    var casper  = require('casper').create({
        verbose:true,
        logLevel:"debug",
        webSecurityEnabled: false,
        loadImages:  false,        // do not load images
        loadPlugins: false
    });
    var deviceIdArray = [];
    var URL = "https://www.gazelle.com";

    function getiPhoneIDs(){
        this.calItems = $('.main_stack.product_stack').find('[data-id]');
        return Array.prototype.map.call(calItems, function(value){
           return {
               "id": value.getAttribute("data-id"),
               "name": value.querySelector("h4").innerHTML
           }
        });
    }

  function getiPadIDs(){
    this.calItems = $('.main_stack.product_stack').find('[data-id]');
    return Array.prototype.map.call(calItems, function(value){
      return {
        "id": value.getAttribute("data-id"),
        "name": value.querySelector("h4").innerHTML
      }
    });
  }

    function getSize(name, array) {
        for(var i = 0; i < array.length; i++) {
            if(name.indexOf(array[i]) !== -1) {
                return array[i];
            }
        }
    }


    casper.options.onResourceRequested = function(casper, requestData, request) {
        // If any of these strings are found in the requested resource's URL, skip
        // this request. These are not required for running tests.
        var skip = [
            'googleads.g.doubleclick.net',
            'cm.g.doubleclick.net',
            'www.googleadservices.com',
            's7.addthis.com'
        ];

        skip.forEach(function(needle) {
            if (requestData.url.indexOf(needle) > 0) {
                request.abort();
            }
        })
    };

    casper.on("remote.message", function(e){
        console.info("Inside Start");
        this.echo("remote>"+e);
    });

    casper.on("page.error", function(e){
        console.info("Inside Start");
        this.echo("error>"+e);
    });

    casper.start(URL, function(){
        console.info("Inside Start");
    });

  /*casper.then(function() {
      carrierIndex = 0;
      for(;index < iPhones.length;){
        for(; carrierIndex < CARRIERS.length;){
          (function(current, carrier) {
            casper.thenOpen("https://www.gazelle.com/iphone/"+iPhones[current]+ "/" +CARRIERS[carrier], function() {
              var _deviceIdArray = this.evaluate(getiPhoneIDs);
              _deviceIdArray.forEach(function(value){
                value.carrier = CARRIERS[carrier];
                value.make = iPhones[current];
                value.size = getSize(value.name, iPhoneSize);
                deviceIdArray.push(value);
              })
            })
          })(index, carrierIndex);
          console.log("printing Array:"+deviceIdArray.length);
          carrierIndex++;
        }
        index++;
        carrierIndex = 0;
      }
    });*/

    casper.then(function() {
      index = 0;

      for(var arrayIndex = 0; arrayIndex < iPAD_CATAGORY.length; arrayIndex++) {
        for (var catagory in iPAD_CATAGORY[arrayIndex]) {
          var deviceArray = iPAD_CATAGORY[arrayIndex][catagory];
          carrierIndex = 0;
          for (; index < deviceArray.length;) {
            carrierIndex = 0;
            for(; carrierIndex < iPAD_CARRIERS.length;) {
              (function (current, carrier, deviceType) {

                var url = "https://www.gazelle.com/ipad/" +
                  deviceType + "/"
                  + deviceArray[index] +"/"
                  + iPAD_CARRIERS[carrier];

                casper.thenOpen(url, function () {
                  var _deviceIdArray = this.evaluate(getiPadIDs);
                  _deviceIdArray.forEach(function (value) {
                    value.carrier = iPAD_CARRIERS[carrier];
                    value.make = deviceArray[index];
                    value.size = getSize(value.name, iPadSize);
                    console.log("url:", url);
                    deviceIdArray.push(value);
                  })
                })
              })(index, carrierIndex, catagory);
              console.log("printing Array:" + deviceIdArray.length);
              carrierIndex++;
            }
            index++;
          }
        }
      }

    });

   casper.run(function(){
        for(var i = 0; i < deviceIdArray.length; i++){
            var data = deviceIdArray[i];
            this.echo("id:"+data.id+" name:"+data.name+ " carrier:"+data.carrier+" size:"+data.size);
        }
        res.status  = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write(JSON.stringify(deviceIdArray, null, ''));
        res.close();
    });
});
console.log("Connected to server:", ip);
