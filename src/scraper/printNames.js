
var MongoClient	= require('mongodb').MongoClient;
var fs = require('fs');
var deviceTypesGazelle;
var DbRef = null;
var query  = process.argv[2];
const DB_URL = 'mongodb://localhost:27017/SellElectronics';

MongoClient.connect(DB_URL,function(err, db) {
  if(err) throw err;

  DbRef = db;
  deviceTypesGazelle = db.collection("deviceTypes");
  deviceTypesGazelle.find({"make": query}, {"_id":0}).toArray( function (err, devices) {
    var s = "";
      devices.forEach(function(device){
        s += '{"display":"' + device.name + '", "gazelle":"'+query+'"},\n';
      });
      fs.writeFile("out.json", s, function() {
        DbRef.close();
      });
  });
})

