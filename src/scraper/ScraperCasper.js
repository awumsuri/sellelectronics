/**
 * Created by Mtui on 9/28/16.
 */
"use-strict";

var ip = "127.0.0.1:8003";

var server = require('webserver').create();

server.timeout = 9999999;

server.listen(ip, function(req, res){
  const CARRIERS = /*["at-t", */["sprint", "verizon", "t-mobile","unlocked"];
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
    /*{
      "ipad-pro": [
        "ipad-pro"
      ]
    },
    {
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
     /* {
        size:"13",
        processors: [
          "1-83-ghz",
          "2-0 -ghz",
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

  }

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

  function getMacbookIDs() {

        console.log("HERERER");
        this.calItems = $("#back_button")[0].href;
        return Array.prototype.map.call(calItems, function() {
          var a = $("#back_button")[0].href.split("/");
          var id = a[a.length - 1];
          var name = a[9];
          name = name.split("-").join(" ");

          return{
            "id": id,
            "name": name
          }
        });
  }

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

  function getSamsungIDs() {
    this.calItems = $(".level_3 li");
    return Array.prototype.map.call(calItems, function(value) {
      return {
        "name": value.querySelector("h4").innerHTML,
        "id": value.getAttribute("data-id")
      }
    })
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
    this.echo("remote>"+e);
  });

  casper.on("page.error", function(e){
    this.echo("error>"+e);
  });

  casper.start(URL, function(){
    console.info("Inside Start");
  });

  casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36");

  //Load iPhone Details
  /*casper.then(function() {
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
   });*/

  //Load iPad Details
  /*casper.then(function() {
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

                }, 100);

              }, 200); //Phantomjs Hack to release memory https://github.com/ariya/phantomjs/issues/13581

              });
            })(index, carrierIndex, catagory);
            carrierIndex++;
          }
          index++;
        }
      }
    }
  });*/


  //Samsung Phones
  /*casper.then(function() {

    index = 0;

    var ref = this;

    for(;index < CARRIERS.length;) {
        (function (current) {

          //setTimeout(function() {
            //setTimeout(function() {
              console.log("index in samsung:"+current);

                var carrier = CARRIERS[current];
                casper.page.close();
                casper.newPage();


                console.log("carriers:"+carrier);
                var url = "https://www.gazelle.com/sell/cell-phone/samsung" + "/" + carrier;
                console.log("url:"+url);

                casper.thenOpen(url, function () {
                  var _deviceIdArray = ref.evaluate(getSamsungIDs);
                  _deviceIdArray.forEach(function (value) {
                    value.carrier = carrier;
                    value.make = "samsung";
                    value.size = "N/A";
                    console.log("url:", url);
                    deviceIdArray.push(value);
                  });
                });
              //}, 1);
            //}, 1); //Phantomjs Hack to release memory https://github.com/ariya/phantomjs/issues/13581
        })(index);

      index++;
    }
  });*/

  //mackbooks

  casper.then(function() {
    var screens = MACBOOK.screen;

    var ref = this;
    console.log("screens"+ screens);

    for(var i = 0; i < screens.length; i++ ) {


      var screen = screens[i];
      var years = screen.year;
      console.log("years:"+ years);

      for(var j = 0; j < years.length; j++) {

        var year = years[j];
        var size = screen.size;
        var processors = screen.processors;
        for(var k = 0; k < processors.length; k++) {
          var processor = processors[k];
          var url = "https://www.gazelle.com/sell/macbook/macbook" + "/" + size + "/" + processor;

          casper.thenOpen(url, function() {

            var value = "/sell/macbook/macbook" + "/" + size + "/" + processor + "/" + year;
             ref.deviceArray = null;

            ref.evaluate(function(value) {
              console.log("options:"+$("#year option"));
              $("#year option").val(value).change();
            }, {value: value});

            ref.waitForSelector("#back_button", function(){
              ref._deviceArray = this.evaluate(getMacbookIDs);
              //this.echo("HERE WONNNNNNNNN")

            });

            console.log("devicearray:" + _deviceArray );

            _deviceArray.forEach( function(device) {
              device.make = "macbook";
              device.size = size;
              device.screen = screen;
              deviceIdArray.push(device);
            });

          });
        }
      }
    }
  });

  casper.run(function() {

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
