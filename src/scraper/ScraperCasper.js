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
    "t-mobile"
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
    /*{
      "ipad-mini": [
        "ipad-mini",
       "ipad-mini-2",
        "ipad-mini-3",
        "ipad-mini-4"
      ]},*/
    /*{
      "ipad-air": [
       /* "1st-gen",
        "2nd-gen"
      ]}
    {
      "ipad": [
        /*"1st-gen",
        /*"2nd-gen",
        /*"3rd-gen",
        "4th-gen"
      ]}*/
  ];

  const iPhoneSize = ["8GB","16GB", "32GB", "64GB", "128GB"];
  const iPadSize = ["16GB", "32GB", "64GB", "128GB", "256GB"];

  var index = 0;
  var carrierIndex = 0;

  var casper  = require('casper').create({
    verbose:true,
    logLevel:"info",
    webSecurityEnabled: false,
    loadImages:  false,
    loadPlugins: false,
    clientScripts: ["../assets/js/jquery-3.0.0.min.js"]
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
      var name = value.querySelector("h4").innerHTML;
      while(name.indexOf('"') !== - 1) {
        name = name.replace('"',"");
      }
      return {
        "id": value.getAttribute("data-id"),
        "name": name
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

    var skip = [
      'googleads.g.doubleclick.net',
      'cm.g.doubleclick.net',
      'www.googleadservices.com',
      's7.addthis.com',
      'platform.twitter.com',
      'staticxx.facebook.com',
      'cdns.gigya.com',
      'ws.sessioncam.com',

    ];

    skip.forEach(function(needle) {
      if (requestData.url.indexOf(needle) > 0) {
        request.cancel();
      }
    });
  };

  casper.on("remote.message", function(e){
    this.console.log("currenturls", deviceIdArray)
    this.echo("remote>"+e);
  });

  casper.on("page.error", function(e){
    this.echo("error>"+e);
  });

  //casper.page.settings.resourceTimeout = 3000;

  casper.start(URL, function(){
    console.info("Inside Start");
  });

  /*casper.page.settings = {

  }*/

  casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36");

  //Load iPhone Details

  casper.then(function() {

   carrierIndex = 0;

   for (;index < iPhones.length;) {
     for (; carrierIndex < CARRIERS.length;) {
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
   });

  //Load iPad Details
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
              var ref = this;

              setTimeout(function() {
                setTimeout(function() {
                  casper.page.close();
                  casper.newPage();

                  var deviceModel = deviceArray[index];

                  var url = "https://www.gazelle.com/ipad/" +
                    deviceType + "/"
                    + deviceModel +"/"
                    + iPAD_CARRIERS[carrier];

                  casper.thenOpen(url, function () {

                    var _deviceIdArray = ref.evaluate(getiPadIDs);

                    _deviceIdArray.forEach(function (value, index) {
                      value.carrier = iPAD_CARRIERS[carrier];
                      value.make = deviceModel;
                      value.size = getSize(value.name, iPadSize);
                      console.log("url:", url);
                      deviceIdArray.push(value);
                    });

                }, 1);

              }, 1000);

              });
            })(index, carrierIndex, catagory);
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
